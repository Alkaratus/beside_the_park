import {Injectable} from "@nestjs/common"

@Injectable()
export class IndexService{
    getIndex():string{
        return "Choose account type<form method='post' action='/'><br>" +
            "<input name=\'body\' type=\"submit\" value=\'Teacher\'><br>" +
            "<input name=\'body\' type=\"submit\" value=\'Student\'>" +
            "</form>"
    }


}