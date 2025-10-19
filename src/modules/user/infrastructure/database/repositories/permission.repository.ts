import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  Permission,
  PermissionType,
} from 'src/modules/user/domain/entities/permission.entity';
import { PermissionRepository as IPermissionRepository } from 'src/modules/user/domain/repositories/permission.repository';
import { PermissionMapper } from '../mappers/permission.mapper';

export class PermissionRepository implements IPermissionRepository {
  constructor(public readonly prismaService: PrismaService) {}

  public async createOne(permission: Permission): Promise<Permission> {
    const result = await this.prismaService.permission.create({
      data: PermissionMapper.toPersistence(permission),
    });

    return PermissionMapper.toDomain(result);
  }

  public async isUserHavePermission(
    user_id: string,
    type: PermissionType,
  ): Promise<boolean> {
    const result = await this.prismaService.permission.findFirst({
      where: {
        user_id: user_id,
        type: type,
      },
    });

    return !!result;
  }
}
