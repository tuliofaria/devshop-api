import { User } from './user.entity'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'

export class UserMapper {
  public static toEntity(input: UserCreateInput): User {
    const entity = new User()
    entity.name = input.name
    entity.email = input.email
    entity.role = input.role
    entity.passwd = input.passwd
    return entity
  }
  public static toUpdateEntity(input: UserUpdateInput): User {
    const entity = new User()
    entity.id = input.id
    entity.name = input.name
    entity.email = input.email
    entity.role = input.role
    return entity
  }
}
