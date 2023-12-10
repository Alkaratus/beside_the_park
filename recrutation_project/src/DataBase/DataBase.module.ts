import { Module } from '@nestjs/common';
import { DATA_BASE_ENTITIES } from './Database.Entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseService } from './DataBase.Service';

@Module({
  imports: [TypeOrmModule.forFeature(DATA_BASE_ENTITIES)],
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
