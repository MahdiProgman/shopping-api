import { Session as SessionPersistenceEntity } from '@prisma/client';
import { Session as SessionDomainEntity } from 'src/modules/user/domain/entities/session.entity';
import { SessionMapper } from './session.mapper';

const sessionDomainEntity: SessionDomainEntity = new SessionDomainEntity({
  device_name: 'Chrome 138 On Linux',
  refresh_token_hash: 'hashed_refresh_token_domain',
  user_id: 'abcd-efgh-ijkl-mnop',
});

const sessionPersistenceEntity: SessionPersistenceEntity = {
  id: 'abcd-efgh-ijkl-mnop',
  device_name: 'Chrome 138 On Linux',
  refresh_token_hash: 'hashed_refresh_token_persistence',
  user_id: 'abcd-efgh-ijkl-mnop',
  expires_at: new Date(),
  last_seen: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
};

describe('SessionMapper', () => {
  describe('toDomain', () => {
    it('should be convert session persistence entity to session domain entity', () => {
      const converted = SessionMapper.toDomain(sessionPersistenceEntity);

      expect(converted.refresh_token_hash).toBe(
        sessionPersistenceEntity.refresh_token_hash,
      );
    });
  });

  describe('toPersistence', () => {
    it('should be convert session domain entity to session persistence entity', () => {
      const converted = SessionMapper.toPersistence(sessionDomainEntity);

      expect(converted.refresh_token_hash).toBe(
        sessionDomainEntity.refresh_token_hash,
      );
    });
  });
});
