import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileEntity } from "./profile.entity";
import {AuthService} from "../auth/auth.service"
import { Repository } from "typeorm";
import "dotenv/config";
import axios from "axios";

@Injectable()
export class ProfileService {
  @InjectRepository(ProfileEntity)
  private readonly authRepo: Repository<ProfileEntity>;
  constructor(private readonly authService: AuthService) {}


  async getImage(email:string, token:string, photoname:string){
    try{
      if(!this.authService.checkToken(email, token))return;
      const s3link = "https://altoya-project-e.s3.ap-southeast-2.amazonaws.com/";
      return(`${s3link}${photoname}.jpg`);
    }catch(e){
      console.error(e);
    }
  }
}