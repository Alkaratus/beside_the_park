import {Module} from "@nestjs/common";
import {TestPanelService} from "./testPanel.service";
import {TestPanelController} from "./testPanel.controler";
import {IndexModule} from "../Index/index.module";



@Module({
    imports: [],
    controllers:[TestPanelController],
    providers:[TestPanelService],
})
export class TestPanelModule{}