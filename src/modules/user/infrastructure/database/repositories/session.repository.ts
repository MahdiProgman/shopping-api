import { PrismaService } from 'src/core/prisma/prisma.service';
import { Session } from 'src/modules/user/domain/entities/session.entity';
import { SessionRepository as ISessionRepository } from 'src/modules/user/domain/repositories/session.repository';
import { SessionMapper } from '../mappers/session.mapper';

export class SessionRepository implements ISessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createOne(session: Session): Promise<Session> {
    const result = await this.prismaService.session.create({
      data: SessionMapper.toPersistence(session),
    });

    return SessionMapper.toDomain(result);
  }

  public async findById(id: string): Promise<Session | null> {
    const sessionFound = await this.prismaService.session.findUnique({
      where: {
        id: id,
      },
    });

    return sessionFound ? SessionMapper.toDomain(sessionFound) : null;
  }
}
