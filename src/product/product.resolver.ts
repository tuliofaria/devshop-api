import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductService } from './product.service'
import { ProductMapper } from './product.mapper'
import { ProductUpdateInput } from './dto/product-update.input'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { GraphQLUpload } from 'apollo-server-express'
import { FileUpload } from 'graphql-upload'

@Resolver(of => ProductPublic)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(returns => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    const products = await this.productService.findAll()
    return products.map(ProductMapper.fromEntityToPublic)
  }
  @Query(returns => ProductPublic, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.findById(id)
    )
  }

  @Query(returns => ProductPublic, { name: 'getProductBySlug' })
  async getProductBySlug(@Args('slug') slug: string): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.findBySlug(slug)
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => ProductPublic, { name: 'panelCreateProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput
  ): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.create(ProductMapper.toEntity(input))
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => ProductPublic, { name: 'panelUpdateProduct' })
  async updateProduct(
    @Args('input') input: ProductUpdateInput
  ): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.update(ProductMapper.fromUpdateToEntity(input))
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteProduct' })
  async deleteProduct(@Args('id') input: string): Promise<boolean> {
    return this.productService.delete(input)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelUploadProductImage' })
  async uploadProductImage(
    @Args('id') id: string,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await file
    return await this.productService.uploadImage(
      id,
      createReadStream,
      filename,
      mimetype
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteProductImage' })
  async deleteProductImage(
    @Args('id') id: string,
    @Args('url') url: string
  ): Promise<boolean> {
    return this.productService.deleteImage(id, url)
  }
}
