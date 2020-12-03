import { Brand } from './brand.entity'
import { BrandPublic } from './dto/brand'
import { BrandCreateInput } from './dto/brand-create.input'
import { BrandUpdateInput } from './dto/brand-update.input'

export class BrandMapper {
  public static toEntity(input: BrandCreateInput): Brand {
    const entity = new Brand()
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }
  public static fromUpdateToEntity(input: BrandUpdateInput): Brand {
    const entity = new Brand()
    entity.id = input.id
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }
  public static fromEntityToPublic(entity: Brand): BrandPublic {
    const brandPublic = new BrandPublic()
    brandPublic.id = entity.id
    brandPublic.name = entity.name
    brandPublic.slug = entity.slug
    return brandPublic
  }
}
