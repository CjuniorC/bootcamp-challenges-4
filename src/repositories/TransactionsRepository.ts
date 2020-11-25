/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          acumulator.income += transaction.value;
        } else {
          acumulator.outcome += transaction.value;
        }

        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    ) as Balance;

    const balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ type, value, title }: Request): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
