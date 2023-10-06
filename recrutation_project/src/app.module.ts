import { Module } from '@nestjs/common';
import {IndexModule} from "./Index/index.module";
import {TestPanelModule} from "./Tests Panel/testPanel.module";

@Module({
  imports: [IndexModule],
})
export class AppModule {}
