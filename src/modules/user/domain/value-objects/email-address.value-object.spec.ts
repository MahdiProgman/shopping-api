import { EmailIsInvalidError } from '../exceptions/email-is-invalid.exception';
import { EmailIsNotSupportedError } from '../exceptions/email-is-not-supported.exception';
import { EmailAddress } from './email-address.value-object';

describe('Email Address Value Object', () => {
  describe('constructor', () => {
    it('should be create a new instance of email address successfully', () => {
      const emailAddress = new EmailAddress('mahdi@gmail.com');

      expect(emailAddress.value).toBe('mahdi@gmail.com');
    });

    it('should be normalize email adderss', () => {
      const emailAddress = new EmailAddress('mahdi.habibkhah+tag@gmail.com');

      expect(emailAddress.value).toBe('mahdihabibkhah@gmail.com');
    });

    it('should be throw an error because email is not supported', () => {
      expect(() => new EmailAddress('mahdi@abcd.com')).toThrow(
        EmailIsNotSupportedError,
      );
    });

    it('should be throw an error because email is invalid', () => {
      expect(() => new EmailAddress('mahdiabcdcom')).toThrow(
        EmailIsInvalidError,
      );
    });
  });
});
