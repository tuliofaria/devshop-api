import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('Brand')
export class BrandPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  logo: string
}
