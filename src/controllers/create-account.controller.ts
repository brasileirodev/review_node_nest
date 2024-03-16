import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async createAccount(@Body() body: any) {
    const { name, email, password } = body;

    const useWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (useWithSameEmail) {
      throw new ConflictException(
        'User with same email already exists',
        {
          description: 'Create User',
        }
      );
    }

    const account = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
