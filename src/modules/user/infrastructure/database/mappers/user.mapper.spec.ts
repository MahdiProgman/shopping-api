import { User as UserPersistenceEntity } from '@prisma/client';
import {
  User as UserDomainEntity,
  UserRole,
} from 'src/modules/user/domain/entities/user.entity';
import { UserMapper } from './user.mapper';

const userDomainEntity: UserDomainEntity = new UserDomainEntity({
  email: 'mahdi-domain@gmail.com',
  first_name: 'Mahdi',
  last_name: 'Habib Khah',
  password_hash: 'my_hashed_password',
});

const userPersistenceEntity: UserPersistenceEntity = {
  id: 'abcd-efgh-ijkl-mnop',
  role: UserRole.Admin,
  email: 'mahdi-persistence@gmail.com',
  first_name: 'Mahdi',
  last_name: 'Habib Khah',
  password_hash: 'my_hashed_password',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('UserMapper', () => {
  describe('toDomain', () => {
    it('should be convert user persistence entity to user domain entity', () => {
      const converted = UserMapper.toDomain(userPersistenceEntity);

      expect(converted.email.value).toBe(userPersistenceEntity.email);
    });
  });

  describe('toPersistence', () => {
    it('should be convert user domain entity to user persistence entity', () => {
      const converted = UserMapper.toPersistence(userDomainEntity);

      expect(converted.email).toBe(userDomainEntity.email.value);
    });
  });
});
