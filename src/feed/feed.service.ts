import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import "dotenv/config";
import { PostsEntity } from "src/posts/posts.entity";

@Injectable()
export class FeedService {
  @InjectRepository(PostsEntity)
  private readonly postsRepo: Repository<PostsEntity>;

  async getFeed(postCount:number){
    let data = await (await this.postsRepo.find({take:postCount})).reverse();
    return data
  }
}
