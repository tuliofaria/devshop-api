import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CategoryUpdateInput {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  slug: string
}
