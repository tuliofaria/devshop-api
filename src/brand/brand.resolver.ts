import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BrandPublic } from './dto/brand'
import { BrandService } from './brand.service'
import { BrandCreateInput } from './dto/brand-create.input'
import { BrandMapper } from './brand.mapper'
import { BrandUpdateInput } from './dto/brand-update.input'
import { GraphQLUpload } from 'apollo-server-express'
import { FileUpload } from 'graphql-upload'

@Resolver(of => BrandPublic)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(returns => [BrandPublic], { name: 'getAllBrands' })
  async getAllCategories(): Promise<BrandPublic[]> {
    return await this.brandService.findAll()
  }

  @Query(returns => BrandPublic, { name: 'getBrandById' })
  async getCategoryById(@Args('id') id: string): Promise<BrandPublic> {
    return await this.brandService.findById(id)
  }

  @Query(returns => BrandPublic, { name: 'getBrandBySlug' })
  async getCategoryBySlug(@Args('slug') slug: string): Promise<BrandPublic> {
    return await this.brandService.findBySlug(slug)
  }

  @Mutation(returns => BrandPublic, { name: 'createBrand' })
  async createCategory(
    @Args('input') input: BrandCreateInput
  ): Promise<BrandPublic> {
    return this.brandService.create(BrandMapper.toEntity(input))
  }

  @Mutation(returns =>Boolean, { name: 'uploadBrandLogo' })
  async uploadLogo(
    @Args('id') id: string,
    @Args('file', { type: () => GraphQLUpload })
    file : FileUpload
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await file
    return await this.brandService.uploadLogo(id, createReadStream, filename, mimetype)
  }

  @Mutation(returns =>Boolean, { name: 'removeBrandLogo' })
  async removeLogo(
    @Args('id') id: string
  ): Promise<boolean> {
    return await this.brandService.removeBrandLogo(id)
  }

  @Mutation(returns => BrandPublic, { name: 'updateBrand' })
  async updateCategory(
    @Args('input') input: BrandUpdateInput
  ): Promise<BrandPublic> {
    return BrandMapper.fromEntityToPublic(await this.brandService.update(BrandMapper.toEntity(input)))
  }

  @Mutation(returns => Boolean, { name: 'deleteBrand' })
  async deleteCategory(@Args('id') input: string): Promise<boolean> {
    return this.brandService.delete(input)
  }
}
