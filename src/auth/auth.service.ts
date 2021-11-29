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

  async auth(){
    let code = this.generateCode().toString();
    // this.sendEmail(code);
    let saltHashed = await this.crypt(code);

  }

  generateCode(){
    return Math.floor(Math.random()* 90000000) + 10000000;
  }

  async crypt(code: string){
    return await bcrypt.hash(code, 10);
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