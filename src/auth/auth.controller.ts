import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
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

  @Get("settings/get/")
  async settings(@Query() query){
    let email = query.email;
    let token = query.token;

    console.log(email)
    console.log(token);

    let settings = await this.authService.getSettings(email, token);
    
    return settings;
  }

  @Post("settings/update/")
  async settingsUpdate(@Body() body){
    let email = body.email;
    let token = body.token;

    let settings = body.settings;

    console.log(email);
    console.log(token);
    console.log(settings);

  }
}
