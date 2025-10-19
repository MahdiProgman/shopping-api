import { Permission, PermissionType } from '../entities/permission.entity';

export interface PermissionRepository {
  createOne(permission: Permission): Promise<Permission>;
  isUserHavePermission(user_id: string, type: PermissionType): Promise<boolean>;
}
