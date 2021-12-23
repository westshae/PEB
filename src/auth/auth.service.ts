import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken"
import "dotenv/config"

@Injectable()
export class AuthService {
  @InjectRepository(AuthEntity) private readonly authRepo: Repository<AuthEntity>;


  async sendCode(email:string){
    //TODO
    //SANITISE EMAIL
    if(await this.authRepo.findOne({email:email}) === undefined){
      this.registerAccount(email);
    }

    let code = (Math.floor(Math.random()* 90000000) + 10000000).toString(); // Generates 8 digit number
    this.sendEmail(code, email);
    let saltHashed = await bcrypt.hash(code, 10);
    let utc = new Date((Date.now() + 300000)).toISOString();//Current time + 5 minutes
    
    this.authRepo.update(email, {email:email, protPass: saltHashed, utcPass:utc, passUsed:false});
  }
  
  async registerAccount(email:string){
    //TODO
    //SANITISE STUFF
    this.authRepo.insert({
      email: email, 
      balance:0,
      ratings:0,
      ratingTotal:0      
    })
  }

  async getSettings(email:string, token:string){
    let data = await this.authRepo.findOne({email:email});
    let settings = {
      city:data.city,
      country:data.country,
      balance:data.balance
    }
    return settings;
  }

  async updateSettings(email:string, token:string, settings:Array<any>){
    if(this.checkToken(token)){
      
    }
  }


  async checkCode(email:string, code: string){
    let codeRegex = /^\b\d{8}\b$/
    let emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

    if(email.match(emailRegex) === null) return false;
    if(code.match(codeRegex) === null) return false;

    try{
      //Checks if email exists in database
      let account = await this.authRepo.findOne({email: email});
      if(account === undefined) return false;

      if(account.passUsed) return false;//Checks that current code hasn't been used

      //Checks that code was used within time required since creation.
      let date = new Date(account.utcPass);
      let currentDate = Date.now();
      let timeDifference = 300000;// 5 minutes in milliseconds
      if(date.getMilliseconds() + timeDifference > currentDate) return false;
      
      let success = await bcrypt.compare(code, account.protPass);//Returns if password was successful or not.

      let payload = {email:account.email}
      let access_token = jwt.sign(payload, process.env.PRIVATEKEY, { expiresIn:"2h"});

      if(success){
        account.passUsed = true;
        this.authRepo.update({email:email}, account);
      }

      

      return {
        access_token: access_token
      }
    }catch(e){
      console.error(e);
      return false;
    }
  }

  async checkToken(token: string){
    try{
      const decoded = jwt.verify(token, process.env.PRIVATEKEY);
      if(decoded === null){
        return false;
      }else{
        return true;
      }
    }catch(e){
      console.error(e);
      return false;
    }
  }

  sendEmail(code: string, email: string) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.EMAILPASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAILSENDER,
        to: email,
        subject: 'AUTHENTICATION',
        text: code
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    
  }
    
}