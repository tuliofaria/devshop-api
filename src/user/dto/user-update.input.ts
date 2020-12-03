import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsUUID, Length, Validate } from 'class-validator'
import { UserEmailIsUnique } from '../validations/UserEmailIsUnique'

@InputType()
export class UserUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @IsEmail()
  @Validate(UserEmailIsUnique)
  email: string

  @Field()
  @Length(3)
  role: string
}
