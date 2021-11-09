import { Field, ObjectType, Float, Int } from '@nestjs/graphql'

@ObjectType('Variation')
export class Variation {
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
@ObjectType('Product')
export class ProductPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  category: string

  @Field({ nullable: true })
  price: number

  @Field(type => [String], { nullable: true })
  images: string[]

  @Field(type => [String], { nullable: true })
  optionNames: string[]

  @Field(type => [Variation], { nullable: true })
  variations: Variation[]
}
