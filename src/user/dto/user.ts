import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('User')
export class UserPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  role: string
}
