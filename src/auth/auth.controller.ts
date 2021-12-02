import { Controller, Get, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get("get")
  get(@Query() query){
    try{
      let email = query.email;
      if(typeof email !== "string") return;
      this.authService.sendCode(email);
    }catch(e){
      console.error(e);
    }
  }
  @Get("check")
  async check(@Query() query){
    try{
      let email = query.email;
      let code = query.code;
      if(typeof email !== "string" || typeof code !== "string") return;
      console.log(await this.authService.checkCode(email,code));
    }catch(e){
      console.error(e);
    }
  }
}
