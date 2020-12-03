import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { CategoryModule } from './category/category.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ProductModule } from './product/product.module'
import { BrandModule } from './brand/brand.module'
import { UserModule } from './user/user.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true
      })
    }),
    CoreModule,
    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:abc123@localhost:5432/devshop',
      autoLoadEntities: true,
      synchronize: true,
      // entities: [Category],
      logging: true
    }),
    */
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res })
    }),
    CategoryModule,
    ProductModule,
    BrandModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
