import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Put, Req, Res, UnauthorizedException } from "@nestjs/common";
import { loginDto, mobileDto, mobileOtpDto, SignupDto } from "./dto";
import { usersService } from "./users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

let Otp;
@Controller('user')
export class UserController {
    constructor(private userservice: usersService,
        private jwt: JwtService,

    ) { }

    //signup using email and mobile no
    @Post('signup')
    async SignUp(@Body() dto: SignupDto) {
        console.log(dto);
        const saltOrRounds = 12;
        const hash = await bcrypt.hash(dto.password, saltOrRounds);
        dto.password = hash;
        const user = await this.userservice.create(dto);
        const msg = "Congratulations! " + user.name + ", your account is successfully created!" +
            "  Thanks:Prafull";

        if (user && user.mobile) { this.userservice.sendmsg(user.mobile, msg); }
        return user;
    }

    //login using password
    @Post('signin')
    async SignIn(@Req() req, @Body() dto: loginDto,
        @Res({ passthrough: true }) response: Response) {
        const email = dto.email;

        const user = await this.userservice.finduser(email);
        if (!user)
            throw new BadRequestException('Invalid creentials');

        if (! await bcrypt.compare(dto.password, user.password))
            throw new BadRequestException('Invalid creentials');

        const token = await this.userservice.signToken((await user).id, (await user).email);
        response.cookie('jwt', (await token).access_token, { httpOnly: true });
        console.log(token);
        return (await token).access_token;
    }


    //sending Otp
    @Post('mobile')
    async SignInMob(@Body() dto: mobileDto) {

        const otpGenerator = require('otp-generator')
        const ootp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        Otp = ootp;
        console.log(Otp);
        const user = await this.userservice.finduserByMob(dto.mobile);

        if (!user)
            throw new BadRequestException('Wrong Mobile Number, Please try again');
        const msg = "Hello " + user.name + ", Please find your OTP " + " " + Otp + " " +
            " for login. Don't share it with anyone!! Thanks:Prafull"
        return this.userservice.sendmsg(dto.mobile, msg);

    }

    //verification and login using mob
    @Post('moblogin')
    async loginMob(@Body() dto: mobileOtpDto,
        @Res({ passthrough: true }) response: Response) {
        const user = await this.userservice.finduserByMob(dto.mobile);
        if (dto.otp != Otp || !user)
            throw new BadRequestException('Wrong OTP !');

        const token = this.userservice.signToken((await user).id, (await user).email);
        response.cookie('jwt', (await token).access_token, { httpOnly: false });

        return (await token).access_token;
    }




    //Get current user
    @Get('me')
    async user(@Req() request: Request, response: Response) {
        try { console.log(process.env.PORT);
            const cookie = request.headers.authorization.split(' ')[1];
            const data = await this.jwt.verifyAsync(cookie, { publicKey: 'jwt_secret_key' });
            if (!data) return response.redirect('http://localhost:4000');
            const user = await this.userservice.findById(data['sub']);
            delete user.password;
            return user;

        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put('update')
    async userUpdate(@Req() request: Request, response: Response) {
        try {
            console.log(process.env.PORT)
            const cookie = request.headers.authorization.split(' ')[1];

            const data = await this.jwt.verifyAsync(cookie, { publicKey: 'jwt_secret_key' });
            if (!data) return "Loged Out";
            const user = await this.userservice.findById(data['sub']);
            let res;
            if (user) res = await this.userservice.update(data['sub'], request.body)
            return res;

        } catch (e) {
            throw new UnauthorizedException();
        }
    }


    //delete current user
    @Delete('delete')
    async userdelete(@Req() request: Request, response: Response) {
        try {
            const cookie = request.headers.authorization.split(' ')[1];
            const data = await this.jwt.verifyAsync(cookie, { publicKey: 'jwt_secret_key' });
            if (!data) return "Loged Out";
            const user = await this.userservice.findById(data['sub']);
            let res;
            if (user) res = await this.userservice.DeleteAccount(data['sub'])
            return res;

        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    //logout the signin user
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        console.log("LogedOut");
        return {
            message: "Logout successfully!"
        }
    }
}