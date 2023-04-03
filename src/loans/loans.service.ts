import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  async loanBatchOperation(loans: CreateLoanDto[]) {
    if (!loans) {
      throw new Error(`Invalid loan object: ${JSON.stringify(loans)}`);
    }
    try {
      await this.prisma.loan.deleteMany({
        where: {
          id: {
            notIn: loans.map((loan) => loan.id)
          }
        }
      })
  
      loans.map(async (loan) => {
        await this.prisma.loan.upsert({
            where: { id: loan.id },
            update: loan,
            create: loan,
        });
      })
    } catch (error) {
      throw new Error(`Loan batch operation runs with an error: ${JSON.stringify(error)}`) ;
    } 
  }
    } catch (error) {
      throw new Error(`Loan batch operation runs with an error: ${JSON.stringify(error)}`) ;
    } 
  }
}
