import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  checkEmail,
  checkPostID,
  checkStringContent,
  checkToken,
} from "src/utility/sanitise";
import { PostsService } from "./posts.service";
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("get")
  async getPost(@Query() query) {
    try {
      let postID = query.postID;
      if (!checkPostID(postID)) return false;
      return await this.postsService.getPost(postID);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("create")
  createPost(@Body() body) {
    try {
      let content = body.content;
      let email = body.email;
      let token = body.token;
      let time = new Date().getMinutes();
      if (
        !checkEmail(email) ||
        !checkStringContent(content) ||
        !checkToken(email, token)
      )
        return false;
      this.postsService.createPost(email, content, time, null);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("delete")
  deletePost(@Body() body) {
    try {
      let email = body.email;
      let postID = body.postID;
      let token = body.token;

      if (
        !checkEmail(email) ||
        !checkPostID(postID) ||
        !checkToken(email, token)
      )
        return false;

      this.postsService.deletePost(email, postID);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("addReply")
  addReply(@Body() body) {
    try {
      let content = body.content;
      let token = body.token;
      let email = body.email;
      let replyID = body.replyID;

      if (
        !checkStringContent(content) ||
        !checkPostID(replyID) ||
        !checkEmail(email) ||
        !checkToken(email, token)
      )
        return false;

      this.postsService.createPost(email, content, replyID);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("addLike")
  addLike(@Body() body) {
    let postID = body.postID;
    let token = body.token;
    let email = body.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.like(postID, true, email);
  }
  @Post("removeLike")
  removeLike(@Body() body) {
    let postID = body.postID;
    let token = body.token;
    let email = body.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.like(postID, false, email);
  }
  @Post("addDislike")
  addDislike(@Body() body) {
    let postID = body.postID;
    let token = body.token;
    let email = body.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.dislike(postID, true, email);
  }
  @Post("removeDislike")
  removeDislike(@Body() body) {
    let postID = body.postID;
    let token = body.token;
    let email = body.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.dislike(postID, false, email);
  }
}
