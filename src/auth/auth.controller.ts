import { Controller, Get, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get("get")
  get(){
    this.authService.sendCode("shaewest02@gmail.com");
    // this.authService.sendCode("empty@empty.com");
  }
  @Get("check")
  async check(@Query() query){
    console.log(query);
    console.log(await this.authService.checkCode("shaewest02@gmail.com",query.query.toString()));
  }
}
