import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { PrismaService } from '../prisma/prisma.service';

describe('LoansService', () => {
  let service: LoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoansService, PrismaService],
    }).compile();

    service = module.get<LoansService>(LoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const loans = [
    {
      "id": 1,
      "name": "loan 1",
      "length": 1,
      "width": 1,
      "height": 1,
      "weight": 1,
      "qty": 1,
      "stackable": true,
      "tiltable": true
    },
    {
      "id": 2,
      "name": "loan 2",
      "length": 2,
      "width": 2,
      "height": 2,
      "weight": 2,
      "qty": 2,
      "stackable": true,
      "tiltable": true
    },
    {
      "id": 3,
      "name": "loan 3",
      "length": 3,
      "width": 3,
      "height": 3,
      "weight": 3,
      "qty": 3,
      "stackable": true,
      "tiltable": true
    },
    
  ]

  it('should be done batch crud in single operation', () => {
    service.loanBatchOperation(loans);
  });

});
