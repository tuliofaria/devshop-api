import { Category } from './category.entity'
import { CategoryCreateInput } from './dto/category-create.input'

export class CategoryMapper {
  public static toEntity(input: CategoryCreateInput): Category {
    const entity = new Category()
    entity.name = input.name
    entity.slug = input.slug
    return entity
  }
}
