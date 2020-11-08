import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Product')
export class ProductPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  category: string
}
