import { Controller, Get, Query } from "@nestjs/common";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("pfp")
  getPfp(@Query() query){
    const email = query.email;
    const token = query.token;
    const photoname = query.photoname;
    return this.profileService.getImage(email, token, photoname);
  }


}

