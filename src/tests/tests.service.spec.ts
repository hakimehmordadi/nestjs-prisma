import { Test, TestingModule } from '@nestjs/testing';
import { TestsService } from './tests.service';
import { PrismaService } from '../prisma/prisma.service';
const testRecord = require('./testrecord.json');

describe('TestsService', () => {
  let service: TestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsService, PrismaService],
    }).compile();

    service = module.get<TestsService>(TestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a test record', async () => {
    const testRecord = await service.findOne(1);
    expect(typeof testRecord).toBe('object');
    expect(testRecord).toEqual(testRecord);
  });

  it('should get a test records', async () => {
    const testRecord = await service.findAll();
    expect(typeof testRecord).toBe('object');
  });

  const testDto = {
    "title": "test record number 1",
    "description": "Desc for test record number 1",
    "body": "body for test record number 1",
    "published": true
  }

  it('should insert a test record', async () => {
    const testRecord =  await service.create(testDto);
    expect(typeof testRecord).toBe('object');
  });
});
