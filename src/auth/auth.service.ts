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

    async getAll(): Promise<AuthEntity[]> {
        return await this.authRepo.find();
    }


  async sendEmail() {
    console.log("REE")
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
        text: ''
      };

      mailOptions.text = "654654";
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    
  }
    
}