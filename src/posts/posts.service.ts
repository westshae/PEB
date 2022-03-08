import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostsEntity } from "./posts.entity";
import { Repository } from "typeorm";
import "dotenv/config";

@Injectable()
export class PostsService {
  @InjectRepository(PostsEntity)
  private readonly postsRepo: Repository<PostsEntity>;

  async createCustomID() {
    let code = (Math.floor(Math.random() * 90000000) + 10000000).toString(); // Generates 8 digit number
    if ((await this.postsRepo.findOne({ postID: code })) !== null) {
      code = (Math.floor(Math.random() * 90000000) + 10000000).toString();
    }
    return code;
  }

  async getPost(postID: string) {
    let data = await this.postsRepo.findOne({ postID: postID });
    return data;
  }

  async createPost(email: string, content: string) {
    let post = {
      ownerEmail: email,
      postID: await this.createCustomID(),
      content: content,
      likes: 0,
      dislikes: 0,
      comments: null,
    };
    this.postsRepo.save(post);
  }

  async deletePost(email: string, postID: string) {
    let post = await this.getPost(postID);
    if (post.ownerEmail === email) {
      this.postsRepo.delete({ postID: postID });
    } else return false;
  }

  async addComment(postID: string, content: string) {
    let post = await this.getPost(postID);
    if (post.comments !== null) {
      post.comments.push(content);
    } else {
      post.comments = [content];
    }
    await this.postsRepo.update(
      { postID: postID },
      { comments: post.comments },
    );
  }

  async like(postID: string, add: boolean, email: string) {
    let post = await this.getPost(postID);
    if (add) {
      if (post.likerEmail === null) {
        post.likes++;
        post.likerEmail = [];

        post.likerEmail.push(email);

      } else if (!post.likerEmail.includes(email)) {
        post.likes++;
        post.likerEmail.push(email);
      }
    } else {
      if (post.likerEmail === null || !post.likerEmail.includes(email)) {
        return false;
      }
      if (post.likerEmail.includes(email)) {
        post.likes--;
        post.likerEmail.splice(post.likerEmail.indexOf(email), 1);
      }
    }
    this.postsRepo.update({ postID: postID }, { likes: post.likes, likerEmail: post.likerEmail });
  }

  async dislike(postID: string, add: boolean, email: string) {
    let post = await this.getPost(postID);
    if (add) {
      if (post.dislikerEmail === null) {
        post.dislikes++;
        post.dislikerEmail = [];
        post.dislikerEmail.push(email);
      }
      if (!post.dislikerEmail.includes(email)) {
        post.dislikes++;
        post.dislikerEmail.push(email);
      }
    } else {
      if (post.dislikerEmail === null) {
        return false;
      } else if (post.dislikerEmail.includes(email)) {
        post.dislikes--;
      }
    }
    this.postsRepo.update({ postID: postID }, { dislikes: post.dislikes, dislikerEmail: post.dislikerEmail });
  }
}
