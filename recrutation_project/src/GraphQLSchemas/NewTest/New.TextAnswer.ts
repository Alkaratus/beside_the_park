import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTextAnswer {
  @Field()
  correct: string;

  constructor(correct?: string) {
    this.correct = correct;
  }
}
