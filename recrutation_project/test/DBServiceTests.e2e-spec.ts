import {DataBaseServiceService} from "../src/DataBaseService/DataBaseService.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Test as TestEntity} from "../src/DataBaseEntities/Test"
import {Repository} from "typeorm";
import {DATA_BASE_ENTITIES} from "../src/DataBaseEntities/database.entities";
import {Test as TestDTO} from "../src/DTOs/Test";
import {ChoiceQuestion as ChoiceQuestionDTO} from "../src/DTOs/ChoiceQuestion";
import {ChoiceAnswer as ChoiceAnswerDTO} from "../src/DTOs/ChoiceAnswer";
import {TextQuestion as TextQuestionDTO} from "../src/DTOs/TextQuestion";
import {TextAnswer as TextAnswerDTO} from "../src/DTOs/TextAnswer";
import {OrderQuestion as OrderQuestionDTO} from "../src/DTOs/OrderQuestion";
import {OrderAnswer as OrderAnswerDTO} from "../src/DTOs/OrderAnswer";

const TypeORMMySqlTestingModule = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'beside_the_park_test',
    entities: DATA_BASE_ENTITIES,
    synchronize: true,
});


describe("DB tests",()=>{
    let service:DataBaseServiceService;
    let testRepository: Repository<TestEntity>;
    let testingModule: TestingModule;

    const TEST_REPOSITORY_TOKEN= getRepositoryToken(TestEntity);

    beforeAll(async ()=>{
        testingModule= await Test.createTestingModule({
            imports: [
                TypeORMMySqlTestingModule,
                TypeOrmModule.forFeature([TestEntity]),
            ],
            providers:[DataBaseServiceService]
        }).compile();
        service= testingModule.get<DataBaseServiceService>(DataBaseServiceService);
        testRepository= testingModule.get<Repository<TestEntity>>(TEST_REPOSITORY_TOKEN)
    });

    afterAll(async ()=>{
        await testingModule.close();
    })


    it("Service should be defined",()=>{
        expect(service).toBeDefined();
    });

    it("Repository should be defined",()=>{
        expect(testRepository).toBeDefined();
    })

    it("New test should be add to database",async ()=>{
        let testDTO:TestDTO= new TestDTO();
        testDTO.name="Test test";
        let choiceQuestion: ChoiceQuestionDTO= new ChoiceQuestionDTO();
        choiceQuestion.content="What is the capital of France?";
        choiceQuestion.multiple=false;
        choiceQuestion.answers=[
            new ChoiceAnswerDTO("London",false),
            new ChoiceAnswerDTO("Paris",true),
            new ChoiceAnswerDTO("Rome",false),
            new ChoiceAnswerDTO("Madrid",false)
        ];
        testDTO.choiceQuestions=[choiceQuestion];

        let textQuestion: TextQuestionDTO= new TextQuestionDTO();
        textQuestion.content="What is the famous phrase from Star Wars";
        textQuestion.answers=[
            new TextAnswerDTO("May the force be with you"),
            new TextAnswerDTO("I have bad feelings about this")
        ]
        testDTO.textQuestions=[textQuestion];

        let orderQuestion: OrderQuestionDTO= new OrderQuestionDTO();
        orderQuestion.content="Arrange the following events in chronological order"
        orderQuestion.answers=[
            new OrderAnswerDTO("Declaration of Independence",1),
            new OrderAnswerDTO("World War II",2),
            new OrderAnswerDTO("First Moon Landing",3)
        ]
        testDTO.orderQuestions=[orderQuestion];

        let createdTest=await service.addNewTest(testDTO);

        expect(createdTest.name).toBe(testDTO.name);
        expect(createdTest.choiceQuestions.length).toBe(1);
        expect(createdTest.orderQuestions.length).toBe(1);
        expect(createdTest.textQuestions.length).toBe(1);
    })

    it("Read data from database", async()=>{
        let tests= await service.getAllTests();
        expect(tests.length).toBeGreaterThanOrEqual(1);
        expect(tests[0].textQuestions.length).toBe(1);
        expect(tests[0].orderQuestions.length).toBe(1);
        expect(tests[0].choiceQuestions.length).toBe(1);
    })

})