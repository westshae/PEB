import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthEntity } from "./auth.entity";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get()
  auth(){
    // this.authService.sendEmail();
    this.authService.auth();
  }

}
