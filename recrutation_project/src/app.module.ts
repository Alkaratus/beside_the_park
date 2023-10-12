import { Module } from '@nestjs/common';
import {IndexModule} from "./Index/index.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {join} from "path";

@Module({
  imports: [
      IndexModule,
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          typePaths:['./src/**/*.graphql'],
          definitions:{
              path: join(process.cwd(),'src/graphql.ts'),
              outputAs: "class"
          }
    }),
  ],
})
export class AppModule {}
