import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { checkEmail, checkToken } from "src/utility/sanitise";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get("get")
  get(@Query() query){
    try{
      let email = query.email;
      if(!checkEmail(email)) return false;
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
      if(!checkEmail(email) || !this.checkCode(code)) return false;
      return await this.authService.checkCode(email,code);
    }catch(e){
      console.error(e);
    }
  }

  @Get("settings/get/")
  async settings(@Query() query){
    let email = query.email;
    let token = query.token;

    if(!checkEmail(email) || !checkToken(email,token)) return false;

    let settings = await this.authService.getSettings(email, token);
    
    return settings;
  }

  @Post("settings/update/")
  async settingsUpdate(@Body() body){
    let email = body.email;
    let token = body.token;

    if(!checkEmail(email) || !checkToken(email, token)) return false;

    let settings = body.settings;
    this.authService.updateSettings(email, token, settings);
  }  
}
