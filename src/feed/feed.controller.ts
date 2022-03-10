import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { FeedService } from "./feed.service";

@Controller("feed")
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get("getFeed")
  async getFeed(@Query() query) {
    try {
      return await this.feedService.getFeed(10);
    } catch (e) {
      console.error(e);
    }
  }
}
