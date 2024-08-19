import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './transactions.entity';


@Injectable()
export class TransactionsService {
  constructor(
   
    
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(description: string, amount: number, type: TransactionType): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({ description, amount, type });
    return this.transactionsRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    return this.transactionsRepository.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<Transaction>): Promise<Transaction> {
    await this.transactionsRepository.update(id, updateData);
    return this.transactionsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.transactionsRepository.delete(id);
  }

  async getBudgetSummary(): Promise<any> {
    const transactions = await this.findAll();
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    const remainingBudget = income - expenses;
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      remainingBudget: remainingBudget,
    };
  }
}
