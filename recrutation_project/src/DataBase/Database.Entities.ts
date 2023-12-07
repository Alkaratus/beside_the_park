import { DatabaseTest } from './Database.Test';
import { DatabaseOrderAnswer } from './Database.OrderAnswer';
import { DatabaseOrderQuestion } from './Database.OrderQuestion';
import { DatabaseChoiceQuestion } from './Database.ChoiceQuestion';
import { DatabaseChoiceAnswer } from './Database.ChoiceAnswer';
import { DatabaseTextQuestion } from './Database.TextQuestion';
import { DatabaseTextAnswer } from './Database.TextAnswer';

export const DATA_BASE_ENTITIES = [
  DatabaseTest,
  DatabaseChoiceQuestion,
  DatabaseChoiceAnswer,
  DatabaseOrderQuestion,
  DatabaseOrderAnswer,
  DatabaseTextQuestion,
  DatabaseTextAnswer,
];
