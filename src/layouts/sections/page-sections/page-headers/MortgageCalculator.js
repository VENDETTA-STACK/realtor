import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function MortgageCalculator() {
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [amortizationPeriod, setAmortizationPeriod] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(mortgageAmount);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = parseFloat(amortizationPeriod) * 12;

    const monthlyPayment = (
      principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)
    ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Mortgage Calculator</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Mortgage Amount"
          value={mortgageAmount}
          onChange={(e) => setMortgageAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amortization Period (years)"
          value={amortizationPeriod}
          onChange={(e) => setAmortizationPeriod(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={calculateMonthlyPayment}
          sx={{ mt: 2 }}
        >
          Calculate
        </Button>
      </Box>
      {monthlyPayment && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Monthly Mortgage Payment: ${monthlyPayment}
        </Typography>
      )}
    </Box>
  );
}

export default MortgageCalculator;
