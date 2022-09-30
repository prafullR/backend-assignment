import { Module } from '@nestjs/common';
import { FBController, GoogleController } from './app.controller';
import { UsersModule } from './users/users.module';
import {config } from './orm.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { GoogleStrategy } from './users/strategy';
import { FacebookStrategy } from './users/strategy/facebook.strategy';
@Module({
  imports: [TypeOrmModule.forRoot(config),UsersModule,ConfigModule.forRoot({isGlobal:true,})],
  controllers: [GoogleController,FBController],
  providers: [AppService, GoogleStrategy,FacebookStrategy],
})
export class AppModule {}
