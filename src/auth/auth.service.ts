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

    if(await this.authRepo.findOne({email: email}) === undefined) {
      this.authRepo.insert({email: email, protPass: saltHashed, utcPass: utc, passUsed: false})
    }else{
      this.authRepo.update(email, {email:email, protPass: saltHashed, utcPass:utc, passUsed:false});
    }
  }


  async checkCode(email:string, code: string){
    let codeRegex = /^\b\d{8}\b$/
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log("FUCK1")

    console.log(email.match(emailRegex));
    console.log(code.match(codeRegex));

    console.log("REEEEEEEEEEEEE")

    if(email.match(emailRegex) === null) return false;
    console.log("FUC2")

    if(code.match(codeRegex) === null) return false;
    console.log("FUCK")
    //TODO
    //Check database values to see if has been used, or fits time period;
    //Change database values
    try{
      //Checks if email exists in database
      let account = await this.authRepo.findOne({email: email});
      if(account === undefined) return false;

      if(account.passUsed) return false;//Checks that current code hasn't been used

      //Checks that code was used within time required since creation.
      let date = new Date(account.utcPass);
      let currentDate = Date.now();
      let timeDifference = 300000;// 5 minutes in milliseconds
      if(date.getMilliseconds() + timeDifference < currentDate) return false;
      
      let success = await bcrypt.compare(code, account.protPass);//Returns if password was successful or not.

      if(success){
        console.log(account)
        account.passUsed = true;
        this.authRepo.update({email:email}, account);
        console.log(await this.authRepo.findOne({email:email}));
        console.log("REEE")
      }

      //Change values of database after successful comparison

      return success;
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