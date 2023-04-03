import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TestsController],
  providers: [TestsService, PrismaService],
  imports: [PrismaModule]
})
export class TestsModule {}
