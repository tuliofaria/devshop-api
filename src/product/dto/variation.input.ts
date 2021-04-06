import { Field, InputType, Float, Int } from '@nestjs/graphql'

@InputType()
export class VariationInput {
  @Field()
  optionName1: string

  @Field()
  optionName2: string

  @Field()
  sku: string

  @Field(type => Float)
  price: number

  @Field(type => Float)
  weight: number

  @Field(type => Int)
  stock: number
}
