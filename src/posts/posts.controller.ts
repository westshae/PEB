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
      let test = await this.postsService.getPost(postID);
      console.log(test);
      return test
    } catch (e) {
      console.error(e);
    }
  }

  @Post("create")
  createPost(@Query() query) {
    try {
      let content = query.content;
      let email = query.email;
      let token = query.token;
      if (
        !checkEmail(email) ||
        !checkStringContent(content) ||
        !checkToken(email, token)
      )
        return false;
      this.postsService.createPost(email, content);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("delete")
  deletePost(@Query() query) {
    try {
      let email = query.email;
      let postID = query.postID;
      let token = query.token;

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

  @Post("addComment")
  addComment(@Query() query) {
    try {
      let postID = query.postID;
      let content = query.content;
      let token = query.token;
      let email = query.email;

      if (
        !checkStringContent(content) ||
        !checkPostID(postID) ||
        !checkEmail(email) ||
        !checkToken(email, token)
      )
        return false;

      this.postsService.addComment(postID, content);
    } catch (e) {
      console.error(e);
    }
  }

  @Post("addLike")
  addLike(@Query() query) {
    let postID = query.postID;
    let token = query.token;
    let email = query.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.like(postID, true);
  }
  @Post("removeLike")
  removeLike(@Query() query) {
    let postID = query.postID;
    let token = query.token;
    let email = query.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.like(postID, false);
  }
  @Post("addDislike")
  addDislike(@Query() query) {
    let postID = query.postID;
    let token = query.token;
    let email = query.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.dislike(postID, true);
  }
  @Post("removeDislike")
  removeDislike(@Query() query) {
    let postID = query.postID;
    let token = query.token;
    let email = query.email;

    if (!checkPostID(postID) || !checkEmail(email) || !checkToken(email, token))
      return false;
    this.postsService.dislike(postID, false);
  }
}
