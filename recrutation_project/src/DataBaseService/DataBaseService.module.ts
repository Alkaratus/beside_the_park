import { Module } from '@nestjs/common';
import { DATA_BASE_ENTITIES } from '../DataBaseEntities/database.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseServiceService } from './DataBaseService.service';

@Module({
  imports: [TypeOrmModule.forFeature(DATA_BASE_ENTITIES)],
  providers: [DataBaseServiceService],
  exports: [DataBaseServiceService],
})
export class DataBaseServiceModule {}
