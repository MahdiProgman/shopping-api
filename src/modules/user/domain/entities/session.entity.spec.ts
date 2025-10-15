import { Session } from './session.entity';

describe('SessionEntity', () => {
  describe('constructor', () => {
    it('should be create a new session instance successfully', () => {
      const session = new Session({
        id: 'abcd-efgh-ijkl-mnop',
        device_name: 'Chrome 138 On Linux',
        refresh_token_hash: 'hashed_refresh_token',
        user_id: 'abcd-efgh-ijkl-mnop',
        expires_at: new Date(),
      });

      expect(session).toBeInstanceOf(Session);
    });

    it('should be set expires_at for session', () => {
      const session = new Session({
        id: 'abcd-efgh-ijkl-mnop',
        device_name: 'Chrome 138 On Linux',
        refresh_token_hash: 'hashed_refresh_token',
        user_id: 'abcd-efgh-ijkl-mnop',
      });

      expect(session.expires_at.getTime()).toBeLessThanOrEqual(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      );
    });
  });
});
