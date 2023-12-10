import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewOrderAnswer {
  @Field()
  content: string;

  @Field(() => Int)
  order: number;

  constructor(content?: string, order?: number) {
    this.content = content;
    this.order = order;
  }
}
