import { Module } from '@nestjs/common';
import {IndexResolver} from "./index.resolver";
import {IndexService} from "./index.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {join} from "path";
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'beside_the_park',
            entities: [],
            synchronize: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths:['./src/**/*.graphql'],
            definitions:{
                path: join(process.cwd(),'src/graphql.ts'),
                outputAs: "class",

            }
        }),],
    providers:[IndexService, IndexResolver],
})
export class IndexModule{}