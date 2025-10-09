import { User } from './user.entity';

describe('UserEntity', () => {
  describe('constructor', () => {
    it('should be create a new instance of user entity', () => {
      const user = new User({
        email: 'mahdi@gmail.com',
        first_name: 'Mahdi',
        last_name: 'HabibKhah',
        password_hash: 'my_hashed_password',
      });

      expect(user).toBeInstanceOf(User);
    });
  });

  describe('changeEmail', () => {
    it('should be change email successfully', () => {
      const user = new User({
        email: 'mahdi@gmail.com',
        first_name: 'Mahdi',
        last_name: 'HabibKhah',
        password_hash: 'my_hashed_password',
      });

      user.changeEmail('amir@gmail.com');

      expect(user.email.value).toBe('amir@gmail.com');
    });
  });

  describe('changePassword', () => {
    it('should be change password successfully', () => {
      const user = new User({
        email: 'mahdi@gmail.com',
        first_name: 'Mahdi',
        last_name: 'HabibKhah',
        password_hash: 'my_hashed_password',
      });

      user.changePassword('my_hashed_password_2');

      expect(user.password_hash).toBe('my_hashed_password_2');
    });
  });
});
