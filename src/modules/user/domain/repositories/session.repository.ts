import { Session } from '../entities/session.entity';

export interface SessionRepository {
  createOne(session: Session): Promise<Session>;
  findById(id: string): Promise<Session | null>;
}
