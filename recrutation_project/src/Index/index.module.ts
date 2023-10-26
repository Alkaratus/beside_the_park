import { Module } from '@nestjs/common';
import {IndexResolver} from "./index.resolver";
import {IndexService} from "./index.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {join} from "path";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Test} from "../DataBaseEntities/Test";
import {DATA_BASE_ENTITIES} from "../DataBaseEntities/database.entities";
import {DataBaseServiceModule} from "../DataBaseService/DataBaseService.module";


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
            typePaths:['./src/**/*.graphql'],
            definitions:{
                path: join(process.cwd(),'src/graphql.ts'),
                outputAs: "class",

            }
        }),
        DataBaseServiceModule,
    ],
    providers:[IndexService, IndexResolver],
})
export class IndexModule{}