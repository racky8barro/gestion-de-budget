import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('float')
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;
}
