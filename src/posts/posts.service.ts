import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostsEntity } from "./posts.entity";
import { Repository } from "typeorm";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import axios from "axios";

@Injectable()
export class PostsService {
  @InjectRepository(PostsEntity)
  private readonly postsRepo: Repository<PostsEntity>;

  async createCustomID(){
    let code = (Math.floor(Math.random() * 90000000) + 10000000).toString(); // Generates 8 digit number
    if(await(this.postsRepo.findOne({id:code})) !== null){
      code = (Math.floor(Math.random() * 90000000) + 10000000).toString();
    }
    return code;
  }

  async getPost(postID: string) {
    let data = await this.postsRepo.findOne({ id: postID });
    console.log(data);
    return data;
  }

  async createPost(email:string, content:string){
    let post = {
      ownerEmail: email,
      id: await (this.createCustomID()),
      content: content,
      likes: 0,
      dislikes: 0,
      comments: null
    }
    this.postsRepo.save(post);
  }

  async addComment(postID:string, content:string){
    let post = await (this.getPost(postID));
    if(post.comments !== null){
      post.comments.push(content);
    }else{
      post.comments = [content];
      
    }
    await this.postsRepo.update({id:postID}, {comments:post.comments});
  }
}
