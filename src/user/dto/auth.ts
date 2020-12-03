import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('AuthToken')
export class AuthToken {
  @Field({ nullable: false })
  refreshToken: string

  @Field({ nullable: false })
  accessToken: string

}