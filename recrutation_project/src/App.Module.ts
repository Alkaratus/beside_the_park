import { Module } from '@nestjs/common';
import { IndexModule } from './Index/Index.Module';

@Module({
  imports: [IndexModule],
})
export class AppModule {}
