import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('AuthSession')
export class AuthSession {
  @Field({ nullable: false })
  id: string

  @Field({ nullable: true })
  userAgent: string

  @Field({ nullable: true })
  lastUsedAt: Date

  @Field({ nullable: true })
  active: boolean
}
