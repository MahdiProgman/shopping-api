import { PrismaService } from 'src/core/prisma/prisma.service';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { EmailAddress } from 'src/modules/user/domain/value-objects/email-address.value-object';
import { UserRepository } from './user.repository';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
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
  let repo: UserRepository;

  beforeEach(() => {
    prisma = new PrismaService({
      info() {},
      warn() {},
      error() {},
    });

    repo = new UserRepository(prisma);
  });

  describe('createOne', () => {
    it('should be create a new user successfully', async () => {
      const newUser = new User({
        email: 'mahdi@gmail.com',
        first_name: 'Mahdi',
        last_name: 'Habib Khah',
        password_hash: 'my_hashed_password',
      });

      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'abcd-efgh-ijkl-mnop',
        email: newUser.email.value,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password_hash: newUser.password_hash,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await repo.createOne(newUser);

      expect(result.id).toBe('abcd-efgh-ijkl-mnop');
    });
  });

  describe('findById', () => {
    it('should be find user successfully', async () => {
      const user = new User({
        id: 'abcd-efgh-ijkl-mnop',
        email: 'mahdi@gmail.com',
        first_name: 'Mahdi',
        last_name: 'Habib Khah',
        password_hash: 'my_hashed_password',
        created_at: new Date(),
        updated_at: new Date(),
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: user.id,
        email: user.email.value,
        first_name: user.first_name,
        last_name: user.last_name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });

      const result = await repo.findById(user.id as string);

      expect(result).toBeInstanceOf(User);
    });

    it('should be return null because user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repo.findById('not-found-id');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should be find user successfully', async () => {
      const user = new User({
        id: 'abcd-efgh-ijkl-mnop',
        email: 'mahdi@gmail.com',
        first_name: 'Mahdi',
        last_name: 'Habib Khah',
        password_hash: 'my_hashed_password',
        created_at: new Date(),
        updated_at: new Date(),
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: user.id,
        email: user.email.value,
        first_name: user.first_name,
        last_name: user.last_name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });

      const result = await repo.findByEmail(user.email);

      expect(result).toBeInstanceOf(User);
    });

    it('should be return null because user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repo.findByEmail(
        new EmailAddress('not-found-email@gmail.com'),
      );

      expect(result).toBeNull();
    });
  });
});
