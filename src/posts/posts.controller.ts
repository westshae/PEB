import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("get")
  async getPost(@Query() query) {
    try {
      let postID = query.postID;
      if (typeof postID !== "string") return;
      return await this.postsService.getPost(postID);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("create")
  createPost(@Query() query) {
    try {
      let emailRegex =
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

      let content = query.content;
      let email = query.email;
      console.log("ree");
      console.log(content);
      if (typeof content !== "string") return false;
      console.log("woo");
      if (email.match(emailRegex) === null) return false;
      console.log("how");
      this.postsService.createPost(email, content);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("delete")
  deletePost(@Query() query){
    try{
      let emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

      let email = query.email;
      let postID = query.id;
      
      if (typeof postID !== "string") return false;
      if (email.match(emailRegex) === null) return false;

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

      if (typeof postID !== "string") return false;
      if (typeof content !== "string") return false;

      this.postsService.addComment(postID, content);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("addLike")
  addLike(@Query() query) {
    let postID = query.id;
    if (typeof postID !== "string") return false;
    this.postsService.like(postID,true);
  }
  @Post("removeLike")
  removeLike(@Query() query) {
    let postID = query.id;
    if (typeof postID !== "string") return false;
    this.postsService.like(postID,false);

  }
  @Post("addDislike")
  addDislike(@Query() query) {
    let postID = query.id;
    if (typeof postID !== "string") return false;
    this.postsService.dislike(postID,true);

  }
  @Post("removeDislike")
  removeDislike(@Query() query) {
    let postID = query.id;
    if (typeof postID !== "string") return false;
    this.postsService.dislike(postID,false);
  }
}
