import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CategoryPublic } from './dto/category'
import { CategoryService } from './category.service'
import { CategoryCreateInput } from './dto/category-create.input'
import { Category } from './category.entity'
import { CategoryMapper } from './category.mapper'
import { CategoryUpdateInput } from './dto/category-update.input'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(of => CategoryPublic)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(returns => [CategoryPublic], { name: 'getAllCategories' })
  async getAllCategories(): Promise<CategoryPublic[]> {
    return await this.categoryService.findAll()
  }

  @Query(returns => CategoryPublic, { name: 'getCategoryById' })
  async getCategoryById(@Args('id') id: string): Promise<CategoryPublic> {
    return await this.categoryService.findById(id)
  }

  @Query(returns => CategoryPublic, { name: 'getCategoryBySlug' })
  async getCategoryBySlug(@Args('slug') slug: string): Promise<CategoryPublic> {
    return await this.categoryService.findBySlug(slug)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CategoryPublic, { name: 'panelCreateCategory' })
  async createCategory(
    @Args('input') input: CategoryCreateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.create(CategoryMapper.toEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CategoryPublic, { name: 'panelUpdateCategory' })
  async updateCategory(
    @Args('input') input: CategoryUpdateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.update(input)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteCategory' })
  async deleteCategory(@Args('id') input: string): Promise<boolean> {
    return this.categoryService.delete(input)
  }
}
