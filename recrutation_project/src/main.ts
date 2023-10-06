import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {IndexModule} from "./Index/index.module";

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);
  await app.listen(3000);
}

bootstrap();
