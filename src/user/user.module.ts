import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserEmailIsUnique } from './validations/UserEmailIsUnique'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthToken } from './authtoken.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, AuthToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      })
    })
  ],
  providers: [UserService, UserResolver, UserEmailIsUnique]
})
export class UserModule {}
console.log('token', process.env.JWT_SECRET)
