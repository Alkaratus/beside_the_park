import {Controller, Get} from "@nestjs/common";
import {TestPanelService} from "./testPanel.service";


@Controller('tests')
export class TestPanelController{
    testPanelService: TestPanelService
    constructor(testPanelService: TestPanelService){
        this.testPanelService= testPanelService;
    }

    @Get('teacher')
    teacher_layout():string{
        return "It will be teacher panel<br><a href='/'>Back to main menu</a>";
    }

    @Get('student')
    student_layout():string{
        return "It will be student layout<br><a href='/'>Back to main menu</a>"
    }
}