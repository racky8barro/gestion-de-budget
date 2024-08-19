import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionType } from './transactions.entity';


@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body('description') description: string,
    @Body('amount') amount: number,
    @Body('type') type: TransactionType,
  ): Promise<Transaction> {
    return this.transactionsService.create(description, amount, type);
  }

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  @Get('summary')
  async getBudgetSummary(): Promise<any> {
    return this.transactionsService.getBudgetSummary();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Transaction> {
    return this.transactionsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.transactionsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.transactionsService.remove(id);
  }
}
