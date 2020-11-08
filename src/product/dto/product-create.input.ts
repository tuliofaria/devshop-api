import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, isUUID, Length, Matches, Validate } from 'class-validator'
import { ProductSlugIsUnique } from '../validations/ProductSlugIsUnique'

@InputType()
export class ProductCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductSlugIsUnique)
  slug: string

  @Field()
  @Length(20)
  description: string

  @Field()
  @IsUUID()
  category: string
}
