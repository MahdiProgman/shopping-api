import { EmailIsInvalidError } from '../exceptions/email-is-invalid.exception';
import { EmailIsNotSupportedError } from '../exceptions/email-is-not-supported.exception';

const supportedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

export class EmailAddress {
  private readonly EMAIL_ADDRESS_REGEX_PATTERN =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(public value: string) {
    this.normalize();

    if (!this.isValid()) throw new EmailIsInvalidError();
    if (!this.isSupported()) throw new EmailIsNotSupportedError();
  }

  public isValid(): boolean {
    return this.EMAIL_ADDRESS_REGEX_PATTERN.test(this.value);
  }

  public isSupported(): boolean {
    return !!supportedDomains.find(
      (value) => value === this.seperatePartOfEmail()[1],
    );
  }

  public normalize() {
    this.value = this.value.toLowerCase();

    const [localPart, domain] = this.seperatePartOfEmail();

    if (domain === 'gmail.com') {
      this.value = localPart.replaceAll('.', '');
      this.value = this.value.split('+')[0];

      this.value += '@' + domain;
    }
  }

  public seperatePartOfEmail() {
    const [localPart, domain] = this.value.split('@');

    return [localPart, domain];
  }
}
