import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandResolver } from './brand.resolver'
import { BrandService } from './brand.service'
import { Brand } from './brand.entity'
import { BrandSlugIsUnique } from './validations/BrandSlugIsUnique'
import { S3 } from 'src/utils/s3'

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, BrandResolver, BrandSlugIsUnique, S3]
})
export class BrandModule {}
