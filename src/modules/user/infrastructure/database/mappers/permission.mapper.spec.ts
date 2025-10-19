import { Permission as PermissionPersistenceEntity } from '@prisma/client';
import {
  Permission as PermissionDomainEntity,
  PermissionType,
} from 'src/modules/user/domain/entities/permission.entity';
import { PermissionMapper } from './permission.mapper';

const permissionDomainEntity: PermissionDomainEntity =
  new PermissionDomainEntity({
    user_id: 'abcd-efgh-ijkl-mnop',
    type: PermissionType.Discounts,
  });

const permissionPersistenceEntity: PermissionPersistenceEntity = {
  id: 'abcd-efgh-ijkl-mnop',
  user_id: 'abcd-efgh-ijkl-mnop',
  type: PermissionType.Products,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('PermissionMapper', () => {
  describe('toDomain', () => {
    it('should be convert Permission persistence entity to permission domain entity', () => {
      const converted = PermissionMapper.toDomain(permissionPersistenceEntity);

      expect(converted.type).toBe(permissionPersistenceEntity.type);
    });
  });

  describe('toPersistence', () => {
    it('should be convert Permission domain entity to permission persistence entity', () => {
      const converted = PermissionMapper.toPersistence(permissionDomainEntity);

      expect(converted.type).toBe(permissionDomainEntity.type);
    });
  });
});
