import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import { S3 } from 'src/utils/s3'
import * as sharp from 'sharp'
import { Category } from 'src/category/category.entity'
import { Brand } from 'src/brand/brand.entity'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3
  ) {}
  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne(id, { loadRelationIds: true })
  }
  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({
      where: [{ slug }],
      loadRelationIds: true
    })
  }
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ loadRelationIds: true })
  }
  async findAllByCategory(categorySlug: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({
      where: [{ slug: categorySlug }]
    })
    return this.productRepository.find({
      loadRelationIds: true,
      where: [{ category: category.id }]
    })
  }
  async findAllByBrand(brandSlug: string): Promise<Product[]> {
    const brand = await this.brandRepository.findOne({
      where: [{ slug: brandSlug }]
    })
    return this.productRepository.find({
      loadRelationIds: true,
      where: [{ brand: brand.id }]
    })
  }
  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }

  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }

  async uploadImage(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string
  ): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }
    const stream = createReadStream().pipe(sharp().resize(300))
    const url = await this.s3.upload(
      stream,
      mimetype,
      'devshop-assets',
      id + '-' + filename
    )
    product.images.push(url)
    await this.productRepository.update(id, {
      images: product.images
    })
    return true
  }

  async deleteImage(id: string, url: string): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }

    const filenameParts = url.split('/')
    const filename = filenameParts[filenameParts.length - 1]

    await this.s3.deleteObject('devshop-assets', filename)
    console.log('delete', url, filename)

    product.images = product.images.filter(imgUrl => imgUrl !== url)
    await this.productRepository.update(id, {
      images: product.images
    })
    return true
  }
}
