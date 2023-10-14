import {Module} from "@nestjs/common";
import {Test} from "./Test";
import {OrderAnswer} from "./OrderAnswer";
import {OrderQuestion} from "./OrderQuestion";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {ChoiceAnswer} from "./ChoiceAnswer";
import {TextQuestion} from "./TextQuestion";
import {TextAnswer} from "./TextAnswer";


export const DATA_BASE_ENTITIES=[
        Test,
        ChoiceQuestion, ChoiceAnswer,
        OrderQuestion,OrderAnswer,
        TextQuestion, TextAnswer
]