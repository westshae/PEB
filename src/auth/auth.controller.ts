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
  @Get("checkcode")
  async checkCode(@Query() query){
    try{
      let email = query.email;
      let code = query.code;
      if(typeof email !== "string" || typeof code !== "string") return;
      return await this.authService.checkCode(email,code);
    }catch(e){
      console.error(e);
    }
  }

  @Get("settings")
  async settings(@Query() query){
    let email = query.email;
    let token = query.code;
    
    return this.authService.getSettings(email, token);
  }
}
