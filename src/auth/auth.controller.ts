import { Controller, Get, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get("get")
  get(){
    this.authService.sendCode("shaewest02@gmail.com");
  }
  @Get("check")
  async check(@Query() query){
    let email = query.email.toString();
    console.log(await this.authService.checkCode("shaewest02@gmail.com",email));
  }
}
