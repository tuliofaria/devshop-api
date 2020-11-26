import { Field, InputType } from '@nestjs/graphql'
import { Length, Matches, Validate } from 'class-validator'
import { BrandSlugIsUnique } from '../validations/BrandSlugIsUnique'
@InputType()
export class BrandCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(BrandSlugIsUnique)
  slug: string
}
