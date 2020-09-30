import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'
import { Category } from './category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver]
})
export class CategoryModule {}
