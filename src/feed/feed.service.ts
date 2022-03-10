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
    // let data = await this.postsRepo.createQueryBuilder().orderBy("time", "DESC").take(postCount).getMany();
    let data = await (await this.postsRepo.find({take:postCount})).reverse();

    console.log(data);
    return data
  }
}
