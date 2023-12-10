import { Module } from '@nestjs/common';
import { IndexResolver } from './Index.Resolver';
import { IndexService } from './Index.Service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DATA_BASE_ENTITIES } from '../DataBase/Database.Entities';
import { DataBaseModule } from '../DataBase/DataBase.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'beside_the_park',
      entities: DATA_BASE_ENTITIES,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      //transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
    }),
    DataBaseModule,
  ],
  providers: [IndexService, IndexResolver],
})
export class IndexModule {}
