import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewChoiceAnswer {
  @Field()
  content: string;

  @Field()
  correct: boolean;

  constructor(content?: string, correct?: boolean) {
    this.content = content;
    this.correct = correct;
  }
}
