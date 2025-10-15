import { Module } from '@nestjs/common';
import { SESSION_REPOSITORY, USER_REPOSITORY } from './constants';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { SessionRepository } from './infrastructure/database/repositories/session.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: SESSION_REPOSITORY,
      useClass: SessionRepository,
    },
  ],
  exports: [USER_REPOSITORY, SESSION_REPOSITORY],
})
export class UserModule {}
