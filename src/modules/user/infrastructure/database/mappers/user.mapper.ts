import { Prisma, User as UserPersistenceEntity } from '@prisma/client';
import {
  User as UserDomainEntity,
  UserRole,
} from 'src/modules/user/domain/entities/user.entity';

export class UserMapper {
  public static toDomain(data: UserPersistenceEntity): UserDomainEntity {
    return new UserDomainEntity({
      ...data,
      role: data.role as UserRole,
    });
  }

  public static toPersistence(data: UserDomainEntity): Prisma.UserCreateInput {
    return {
      role: data.role,
      email: data.email.value,
      first_name: data.first_name,
      last_name: data.last_name,
      password_hash: data.password_hash,
    };
  }
}
