import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiTags('loans')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() loansDto: CreateLoanDto[]) {
    return this.loansService.loanBatchOperation(loansDto);
  }
}
