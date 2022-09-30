import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignupDto } from "./dto";
import { UsersEntity } from "./users.entity";
let plivo = require('plivo');
let client = new plivo.Client('MAOGFIZWM4OWVIODIYYJ', 'YWVlM2FlNmU4Y2QwNWY2MzllMjM5YmY0N2U1ZTZm');
@Injectable()
export class usersService{
    constructor(
        private jwt: JwtService,
        @InjectRepository(UsersEntity) 
        private signUpData:Repository<UsersEntity>,
     ){}

async create(data:SignupDto):Promise<UsersEntity>{
       const user= await this.signUpData.save(data);  
       delete user.password;
       return user; 
     }
async update(id:number,data:SignupDto)
{
    const user= await this.signUpData.update(id, data);
       return user;
}
async DeleteAccount(id:number){
    this.signUpData.delete(id);
    return {message:"ops you have deleted your Account!"};
}
async finduser(email:string):Promise<UsersEntity | undefined>{
    return this.signUpData.findOne({where:{email : email}})
}
async finduserByMob(mobile:string):Promise<UsersEntity | undefined>{
    return this.signUpData.findOne({where:{mobile : mobile}})
}
async findById(id:number):Promise<UsersEntity | undefined>{
    return this.signUpData.findOne({where:{id :id}});
}

//signtoken session
async signToken(userId: number, email: string,): Promise<{ access_token: string }> {
    const secret = 'jwt_secret_key';
    const payload = {
        sub: userId,
        email,
    };
    const token = await this.jwt.signAsync(
        payload,
        {
            expiresIn: '10m',
            secret: secret,
        })
    
    return {
        access_token: token,
    }
}

//otp 
sendmsg(mobile:string,msg:string){
    console.log("came");
client.messages.create({
    src: '+917366832105',
    dst: "+91"+mobile,
    text: msg,
}).then(function(response) {
    console.log(response);
}); 
}
}

