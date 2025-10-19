import { Permission, PermissionType } from './permission.entity';

describe('PermissionEntity', () => {
  describe('constructor', () => {
    it('should be create a new instance of permission successfully', () => {
      const permission = new Permission({
        user_id: 'abcd-efgh-ijkl-mnop',
        type: PermissionType.Products,
      });

      expect(permission).toBeInstanceOf(Permission);
    });
  });
});
