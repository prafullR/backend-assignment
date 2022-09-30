import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from "dotenv";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({credentials:true, origin: '*'});
  app.use(cookieParser());
  const PORT = process.env.PORT;
  await app.listen(PORT,"0.0.0.0",()=>console.log(`server at ${PORT}`));
}
bootstrap();
