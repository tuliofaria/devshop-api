import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CategoryCreateInput {
  @Field()
  name: string

  @Field()
  slug: string
}
