import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  loanBatchOperation(loans: CreateLoanDto[]) {
    if (!loans) {
      throw new Error(`Invalid loan object: ${JSON.stringify(loans)}`);
    }
    try {
      loans.map(async (loan) => {
        
        /** Delete is commented because some times not works properly */

        // await this.prisma.loan.deleteMany({
        //     where: {
        //       id: {
        //         not: loan.id,
        //       }
        //     },
        // });
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
}
