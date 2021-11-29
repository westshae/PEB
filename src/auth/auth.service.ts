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


  async sendCode(email:string){
    //TODO
    //SANITISE EMAIL

    let code = (Math.floor(Math.random()* 90000000) + 10000000).toString(); // Generates 8 digit number
    this.sendEmail(code, email);
    let saltHashed = await bcrypt.hash(code, 10);
    let utc = new Date((Date.now() + 300000)).toISOString();//Current time + 5 minutes

    if(this.authRepo.findOne({email: email}) !== undefined) {
      this.authRepo.insert({email: email, protPass: saltHashed, utcPass: utc, passUsed: false})
    }else{
      this.authRepo.update(email, {email:email, protPass: saltHashed, utcPass:utc, passUsed:false});
    }
  }


  async checkCode(email:string, code: string, hash: string){
    //TODO
    //Check database values to see if has been used, or fits time period;
    //Change database values
    return await bcrypt.compare(code, hash);
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