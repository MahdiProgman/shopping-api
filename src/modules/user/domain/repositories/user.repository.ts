import { User } from '../entities/user.entity';
import { EmailAddress } from '../value-objects/email-address.value-object';

export interface UserRepository {
  createOne(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: EmailAddress): Promise<User | null>;
}
