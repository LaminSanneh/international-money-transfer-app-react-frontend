import React from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const TransactionHistory = () => {
  // Mock data for transaction history
  const transactions = [
    { id: 1, recipient: 'John Doe', amount: 100, currency: 'USD', date: '2024-03-13' },
    { id: 2, recipient: 'Jane Smith', amount: 150, currency: 'EUR', date: '2024-03-12' },
    // Additional mock transactions
  ];

  return (
    <div>
      <Typography variant="h4">Transaction History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.recipient}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.currency}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TransactionHistory;
