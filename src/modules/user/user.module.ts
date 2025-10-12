import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './constants';
import { UserRepository } from './infrastructure/database/repositories/user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
