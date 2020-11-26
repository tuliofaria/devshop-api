import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { BrandService } from "../brand.service";

@ValidatorConstraint({ name: 'categorySlugIsUnique', async: true })
export class BrandSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly brandService: BrandService){
  }
  async validate(text: string, validationArguments: ValidationArguments): Promise<boolean>{
    const id = validationArguments.object['id']
    const brand = await this.brandService.findBySlug(text)
    if(brand){
      if(id){ // update
        if(id === brand.id){
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