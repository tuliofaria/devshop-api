import { Field, InputType, Float, Int } from '@nestjs/graphql'
import { IsUUID, isUUID, Length, Matches, Validate } from 'class-validator'
import { ProductSlugIsUnique } from '../validations/ProductSlugIsUnique'
import { VariationInput } from './variation.input'

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

  @Field({ nullable: true })
  sku: string

  @Field(type => Float, { nullable: true })
  price: number

  @Field(type => Float, { nullable: true })
  weight: number

  @Field(type => Int)
  stock: number

  @Field(type => [String], { nullable: true })
  optionNames: string[]

  @Field(type => [VariationInput], { nullable: true })
  variations: VariationInput[]
}
