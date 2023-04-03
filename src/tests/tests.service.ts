import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ITestsService } from './itest.service';

@Injectable()
export class TestsService implements ITestsService {
  constructor(private prisma: PrismaService) {}

  // CRUD operations
  create(createTestDto: CreateTestDto) {
    return this.prisma.article.create({ data: createTestDto });
  }

  findAll() {
    return this.prisma.article.findMany({ where: {published: true}});
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateTestDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
  
}
