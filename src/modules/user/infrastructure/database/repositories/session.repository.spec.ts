import { PrismaService } from 'src/core/prisma/prisma.service';
import { Session } from 'src/modules/user/domain/entities/session.entity';
import { SessionRepository } from './session.repository';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      session: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

describe('UserRepository', () => {
  let prisma: PrismaService;
  let repo: SessionRepository;

  beforeEach(() => {
    prisma = new PrismaService({
      info() {},
      warn() {},
      error() {},
    });

    repo = new SessionRepository(prisma);
  });

  describe('createOne', () => {
    it('should be create a new session successfully', async () => {
      const newSession = new Session({
        device_name: 'Chrome 138 On Linux',
        refresh_token_hash: 'hashed_refresh_token',
        user_id: 'abcd-efgh-ijkl-mnop',
      });

      (prisma.session.create as jest.Mock).mockResolvedValue({
        id: 'abcd-efgh-ijkl-mnop',
        device_name: newSession.device_name,
        refresh_token_hash: newSession.refresh_token_hash,
        user_id: newSession.user_id,
        last_seen: new Date(),
        expires_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await repo.createOne(newSession);

      expect(result.id).toBe('abcd-efgh-ijkl-mnop');
    });
  });

  describe('findById', () => {
    it('should be find the session by id successfully', async () => {
      (prisma.session.findUnique as jest.Mock).mockResolvedValue({
        id: 'abcd-efgh-ijkl-mnop',
        device_name: 'Chrome 138 On Linux',
        refresh_token_hash: 'hashed_refresh_token',
        user_id: 'abcd-efgh-ijkl-mnop',
        last_seen: new Date(),
        expires_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await repo.findById('abcd-efgh-ijkl-mnop');

      expect((result as Session).id).toBe('abcd-efgh-ijkl-mnop');
    });

    it('should be return null', async () => {
      (prisma.session.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repo.findById('abcd-efgh-ijkl-mnop');

      expect(result).toBeNull();
    });
  });
});
