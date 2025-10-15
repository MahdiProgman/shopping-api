import { Prisma, Session as SessionPersistenceEntity } from '@prisma/client';
import { Session as SessionDomainEntity } from 'src/modules/user/domain/entities/session.entity';

export class SessionMapper {
  public static toDomain(data: SessionPersistenceEntity): SessionDomainEntity {
    return new SessionDomainEntity({
      ...data,
    });
  }

  public static toPersistence(
    data: SessionDomainEntity,
  ): Prisma.SessionCreateInput {
    return {
      id: data.id,
      device_name: data.device_name,
      refresh_token_hash: data.refresh_token_hash,
      last_seen: data.last_seen,
      expires_at: data.expires_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user: {
        connect: {
          id: data.user_id,
        },
      },
    };
  }
}
