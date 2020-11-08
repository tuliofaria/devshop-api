import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { CategoryService } from "../category.service";
import { CategoryUpdateInput } from "../dto/category-update.input";

@ValidatorConstraint({ name: 'categorySlugIsUnique', async: true })
export class CategorySlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService){
  }
  async validate(text: string, validationArguments: ValidationArguments): Promise<boolean>{
    const id = validationArguments.object['id']
    const category = await this.categoryService.findBySlug(text)
    if(category){
      if(id){ // update
        if(id === category.id){
          return true
        }
      }
      return false
    }
    return true
  }
  defaultMessage() : string{
    return 'Slug must be unique'
  }
}