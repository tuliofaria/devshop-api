import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class UserPassUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @Length(3)
  passwd: string
}
