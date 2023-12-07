import {DataBaseService} from "../src/DataBase/DataBase.Service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseTest as TestEntity} from "../src/DataBase/Database.Test"
import {Repository} from "typeorm";
import {DATA_BASE_ENTITIES} from "../src/DataBase/Database.Entities";
import {NewTest} from "../src/GraphQLSchemas/NewTest/New.Test";
import {NewSingleChoiceQuestion} from "../src/GraphQLSchemas/NewTest/New.SingleChoiceQuestion";
import {NewTextQuestion} from "../src/GraphQLSchemas/NewTest/New.TextQuestion";
import {NewOrderQuestion} from "../src/GraphQLSchemas/NewTest/New.OrderQuestion";
import {NewChoiceAnswer} from "../src/GraphQLSchemas/NewTest/New.ChoiceAnswer";
import {NewTextAnswer} from "../src/GraphQLSchemas/NewTest/New.TextAnswer";
import {NewOrderAnswer} from "../src/GraphQLSchemas/NewTest/New.OrderAnswer";

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
    let service:DataBaseService;
    let testRepository: Repository<TestEntity>;
    let testingModule: TestingModule;

    const TEST_REPOSITORY_TOKEN= getRepositoryToken(TestEntity);

    beforeAll(async ()=>{
        testingModule= await Test.createTestingModule({
            imports: [
                TypeORMMySqlTestingModule,
                TypeOrmModule.forFeature([TestEntity]),
            ],
            providers:[DataBaseService]
        }).compile();
        service= testingModule.get<DataBaseService>(DataBaseService);
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
        let newTest= new NewTest("AbstractTest test");
        newTest.setToDefault();
        newTest.singleChoiceQuestions.push(new NewSingleChoiceQuestion(
            "What is the capital of France?",[
                new NewChoiceAnswer("London",false),
                new NewChoiceAnswer("Paris",true),
                new NewChoiceAnswer("Rome",false),
                new NewChoiceAnswer("Madrid",false)
            ]
        ));

        newTest.multipleChoiceQuestions=[];

        let textQuestion= new NewTextQuestion("What is the famous phrase from Star Wars",[
            new NewTextAnswer("May the force be with you"),
            new NewTextAnswer("I have bad feelings about this")
        ]);

        newTest.textQuestions.push(textQuestion);

        let orderQuestion= new NewOrderQuestion();
        orderQuestion.content="Arrange the following events in chronological order"
        orderQuestion.answers=[
            new NewOrderAnswer("Declaration of Independence",1),
            new NewOrderAnswer("World War II",2),
            new NewOrderAnswer("First Moon Landing",3),
        ]
        newTest.orderQuestions.push(orderQuestion);

        let createdTest=await service.addNewTest(newTest);

        expect(createdTest.name).toBe(newTest.name);
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