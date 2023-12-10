import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseTest as TestEntity } from './Database.Test';
import { ConverterGraphQLInputToEntity } from '../Converters/Converter.GraphQLInputToEntity';
import { NewTest } from '../GraphQLSchemas/NewTest/New.Test';
import { DatabaseChoiceQuestion as ChoiceQuestionEntity } from './Database.ChoiceQuestion';
import { DatabaseMultipleChoiceQuestion as MultipleChoiceQuestionEntity } from './Database.MultipleChoiceQuestion';
import { DatabaseSingleChoiceQuestion as SingleChoiceQuestionEntity } from './Database.SingleChoiceQuestion';

@Injectable()
export class DataBaseService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testsRepository: Repository<TestEntity>,
  ) {}

  async getAllTests(): Promise<TestEntity[]> {
    const tests = await this.testsRepository.find({
      relations: {
        choiceQuestions: {
          answers: true,
        },
        orderQuestions: {
          answers: true,
        },
        textQuestions: {
          answers: true,
        },
      },
    });
    tests.forEach((test) => {
      this.resolveQuestions(test.choiceQuestions);
    });
    return tests;
  }

  async getTestById(id: number) {
    const test = await this.testsRepository.findOne({
      relations: {
        choiceQuestions: {
          answers: true,
        },
        orderQuestions: {
          answers: true,
        },
        textQuestions: {
          answers: true,
        },
      },
      where: {
        id: id,
      },
    });
    if (test != null) {
      this.resolveQuestions(test.choiceQuestions);
    }
    return test;
  }

  async addNewTest(newTest: NewTest): Promise<TestEntity> {
    const converter: ConverterGraphQLInputToEntity =
      new ConverterGraphQLInputToEntity();
    const createdTest: TestEntity = this.testsRepository.create(
      converter.convertTest(newTest),
    );
    await this.testsRepository.save(createdTest);
    this.resolveQuestions(createdTest.choiceQuestions);
    return createdTest;
  }

  resolveQuestions(choiceQuestions: ChoiceQuestionEntity[]): void {
    choiceQuestions.forEach((question, index, questions) => {
      if (question.multiple) {
        questions[index] = new MultipleChoiceQuestionEntity(
          question.id,
          question.content,
          question.answers,
        );
      } else {
        questions[index] = new SingleChoiceQuestionEntity(
          question.id,
          question.content,
          question.answers,
        );
      }
    });
  }
}
