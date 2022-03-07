import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Get("get")
  get(@Query() query){
    try{
      let email = query.email;
      if(typeof email !== "string") return;
    }catch(e){
      console.error(e);
    }
  }
}
