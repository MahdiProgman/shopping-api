import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  Permission,
  PermissionType,
} from 'src/modules/user/domain/entities/permission.entity';
import { PermissionRepository } from './permission.repository';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      permission: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

describe('PermissionRepository', () => {
  let prisma: PrismaService;
  let repo: PermissionRepository;

  beforeEach(() => {
    prisma = new PrismaService({
      info() {},
      warn() {},
      error() {},
    });

    repo = new PermissionRepository(prisma);
  });

  describe('createOne', () => {
    it('should be create a new permission successfully', async () => {
      const newPermission = new Permission({
        user_id: 'abcd-efgh-ijkl-mnop',
        type: PermissionType.Discounts,
      });

      (prisma.permission.create as jest.Mock).mockResolvedValue({
        id: 'abcd-efgh-ijkl-mnop',
        user_id: newPermission.user_id,
        type: PermissionType.Discounts,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await repo.createOne(newPermission);

      expect(result.id).toBe('abcd-efgh-ijkl-mnop');
    });
  });

  describe('isUserHavePermission', () => {
    it('should be return true', async () => {
      (prisma.permission.findFirst as jest.Mock).mockResolvedValue({
        id: 'abcd-efgh-ijkl-mnop',
        user_id: 'abcd-efgh-ijkl-mnop',
        type: PermissionType.Products,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await repo.isUserHavePermission(
        'abcd-efgh-ijkl-mnop',
        PermissionType.Products,
      );

      expect(result).toBe(true);
    });

    it('should be return false', async () => {
      (prisma.permission.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repo.isUserHavePermission(
        'abcd-efgh-ijkl-mnop',
        PermissionType.Tickets,
      );

      expect(result).toBe(false);
    });
  });
});
