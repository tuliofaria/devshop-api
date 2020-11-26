import { Brand } from './brand.entity'
import { BrandPublic } from './dto/brand'
import { BrandCreateInput } from './dto/brand-create.input'

export class BrandMapper {
  public static toEntity(input: BrandCreateInput): Brand {
    const entity = new Brand()
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }
  public static fromEntityToPublic(entity: Brand): BrandPublic{
    const brandPublic = new BrandPublic()
    brandPublic.id = entity.id
    brandPublic.name = entity.name
    brandPublic.slug = entity.slug
    return brandPublic
  }
}
