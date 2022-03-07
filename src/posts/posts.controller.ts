import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { checkEmail, checkPostID, checkStringContent } from "src/utility/sanitise";
import { PostsService } from "./posts.service";
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("get")
  async getPost(@Query() query) {
    try {
      let postID = query.postID;
      if(!checkPostID(postID)) return false;
      return await this.postsService.getPost(postID);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("create")
  createPost(@Query() query) {
    try {
      let content = query.content;
      let email = query.email;
      if(!checkEmail(email) || !checkStringContent(content)) return false;
      this.postsService.createPost(email, content);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("delete")
  deletePost(@Query() query){
    try{

      let email = query.email;
      let postID = query.id;

      if(!checkEmail(email) || !checkPostID(postID)) return false;

      this.postsService.deletePost(email, postID);
    }catch(e){
      console.error(e);
    }
  }

  @Post("addComment")
  addComment(@Query() query) {
    try {
      let postID = query.id;
      let content = query.content;

      if(!checkStringContent(content) || !checkPostID(postID)) return false;

      this.postsService.addComment(postID, content);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("addLike")
  addLike(@Query() query) {
    let postID = query.id;
    if(!checkPostID(postID)) return false;
    this.postsService.like(postID,true);
  }
  @Post("removeLike")
  removeLike(@Query() query) {
    let postID = query.id;
    if(!checkPostID(postID)) return false;
    this.postsService.like(postID,false);

  }
  @Post("addDislike")
  addDislike(@Query() query) {
    let postID = query.id;
    if(!checkPostID(postID)) return false;
    this.postsService.dislike(postID,true);

  }
  @Post("removeDislike")
  removeDislike(@Query() query) {
    let postID = query.id;
    if(!checkPostID(postID)) return false;
    this.postsService.dislike(postID,false);
  }
}
