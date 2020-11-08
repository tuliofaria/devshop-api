import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne(id, { loadRelationIds: true })
  }
  async findBySlug(slug: string): Promise<Product>{
    return this.productRepository.findOne({ where: [{ slug }]})
  }
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ loadRelationIds: true })
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
}
