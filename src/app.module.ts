import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transactions.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'database_bd',
      entities: [Transaction],
      synchronize: true, 
    }),
    TransactionsModule,
  ],
  controllers: [AppController, TransactionsController],
  providers: [AppService],
})
export class AppModule {}
