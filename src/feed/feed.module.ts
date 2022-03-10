import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsEntity } from "src/posts/posts.entity";
import { FeedController } from "./feed.controller";
import { FeedEntity } from "./feed.entity";
import { FeedService } from "./feed.service";

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
