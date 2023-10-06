import {Body, Controller, Get, Post, Res} from '@nestjs/common'
import {IndexService} from "./index.service";

@Controller()
export class IndexController{
    indexService: IndexService;

    constructor(indexService: IndexService){
        this.indexService=indexService;
    }
    @Get()
    getIndex():string{
        return this.indexService.getIndex();
    }

    @Post()
    redirect(@Body() body:Object, @Res() res):void{
        console.log(body);
        if(body["body"]=='Teacher'){
            res.redirect('/tests/teacher');
        }
        else{
            res.redirect('/tests/student');
        }
    }
}