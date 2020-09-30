import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('Category')
export class CategoryPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string
}
