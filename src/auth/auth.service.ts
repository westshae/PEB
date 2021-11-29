import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import "dotenv/config"

@Injectable()
export class AuthService {
  @InjectRepository(AuthEntity) private readonly authRepo: Repository<AuthEntity>;

  async sendCode(){
    let code = (Math.floor(Math.random()* 90000000) + 10000000).toString();
    // this.sendEmail(code);
    let saltHashed = await bcrypt.hash(code, 10);
    let utc = Date.now();

    //TODO
    //Save time, saltHashed to database
  }

  async checkCode(code: string, hash: string){
    //TODO
    //Check database values to see if has been used, or fits time period;
    //Change database values
    return await bcrypt.compare(code, hash);
  }

  sendEmail(code: string) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.EMAILPASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAILSENDER,
        to: process.env.TESTEMAIL,
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