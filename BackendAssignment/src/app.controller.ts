import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('google')
export class GoogleController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req,@Res({ passthrough: true }) response: Response) {
    return this.appService.Login(req,response);
  }
}

@Controller('')
export class FBController{
 
  constructor(private readonly appService: AppService) {}
  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req,@Res({ passthrough: true }) response: Response): Promise<any> {
    return this.appService.Login(req,response);
  }
  
}


