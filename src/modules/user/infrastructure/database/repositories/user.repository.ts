import { PrismaService } from 'src/core/prisma/prisma.service';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { UserRepository as IUserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { EmailAddress } from 'src/modules/user/domain/value-objects/email-address.value-object';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(public readonly prismaService: PrismaService) {}

  public async createOne(user: User): Promise<User> {
    const result = await this.prismaService.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(result);
  }

  public async findById(id: string): Promise<User | null> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    return userFound ? UserMapper.toDomain(userFound) : null;
  }

  public async findByEmail(email: EmailAddress): Promise<User | null> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        email: email.value,
      },
    });

    return userFound ? UserMapper.toDomain(userFound) : null;
  }
}
