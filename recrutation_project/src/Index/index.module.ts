import { Module } from '@nestjs/common';
import {IndexController} from "./index.controler";
import {IndexService} from "./index.service";
import {TestPanelModule} from "../Tests Panel/testPanel.module";


@Module({
    imports: [TestPanelModule],
    controllers:[IndexController],
    providers:[IndexService],
})
export class IndexModule{}