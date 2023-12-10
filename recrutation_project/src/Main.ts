import { NestFactory } from '@nestjs/core';
import { IndexModule } from './Index/Index.Module';

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);
  await app.listen(3000);
}

bootstrap();
