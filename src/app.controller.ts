import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService
  ) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('list-users')
  async store() {
    return await this.prismaService.user.findMany();
  }
  @Delete('delete-user')
  async delete() {
    return await this.prismaService.user.delete({
      where: {
        id: '3c3dcd5f-8229-474e-8bad-2913c86dd425',
      },
    });
  }

  @Post('create-user')
  async create() {
    return await this.prismaService.user.create({
      data: {
        name: 'Marcel Brasileiro',
        email: 'brasileiroleao2@gmail.com',
        password: '12345678',
      },
    });
  }
}
