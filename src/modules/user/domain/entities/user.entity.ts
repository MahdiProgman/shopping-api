import { EmailAddress } from '../value-objects/email-address.value-object';

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
  Owner = 'OWNER',
}

interface UserProps {
  id?: string;
  role?: UserRole;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  public readonly id?: string;
  private _role: UserRole;
  private _email: EmailAddress;
  public first_name: string;
  public last_name: string;
  private _password_hash: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this._role = props.role ?? UserRole.User;
    this._email = new EmailAddress(props.email);
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this._password_hash = props.password_hash;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  get role() {
    return this._role;
  }

  get email() {
    return this._email;
  }

  get password_hash() {
    return this._password_hash;
  }

  public changeRole(role: UserRole) {
    this._role = role;
  }

  public changeEmail(email: string) {
    this._email = new EmailAddress(email);
  }

  public changePassword(password_hash: string) {
    this._password_hash = password_hash;
  }

  public getObject() {
    return {
      id: this.id,
      email: this._email.value,
      first_name: this.first_name,
      last_name: this.last_name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
