import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import "dotenv/config";
import { PostsEntity } from "src/posts/posts.entity";
@Injectable()
export class FeedService {
  @InjectRepository(PostsEntity)
  private readonly postsRepo: Repository<PostsEntity>;

  async getFeed(postCount: number) {
    const result = await this.postsRepo
    .createQueryBuilder()
    .orderBy("time", "DESC")
    .limit(postCount)
    .getMany();
    return result;
  }
}
