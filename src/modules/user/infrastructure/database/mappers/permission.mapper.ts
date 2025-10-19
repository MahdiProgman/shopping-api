import {
  Permission as PermissionPersistenceEntity,
  Prisma,
} from '@prisma/client';
import {
  Permission as PermissionDomainEntity,
  PermissionType,
} from 'src/modules/user/domain/entities/permission.entity';

export class PermissionMapper {
  static toDomain(data: PermissionPersistenceEntity): PermissionDomainEntity {
    return new PermissionDomainEntity({
      ...data,
      type: data.type as PermissionType,
    });
  }

  static toPersistence(
    data: PermissionDomainEntity,
  ): Prisma.PermissionCreateInput {
    return {
      type: data.type,
      user: {
        connect: {
          id: data.user_id,
        },
      },
    };
  }
}
