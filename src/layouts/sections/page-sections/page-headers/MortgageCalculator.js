import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import MKButton from 'components/MKButton';

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mortgage Amount"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Interest Rate (%)"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Amortization Period (years)"
              value={amortizationPeriod}
              onChange={(e) => setAmortizationPeriod(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <MKButton
          variant="contained"
          color="info"
          onClick={calculateMonthlyPayment}
          sx={{ mt: 2 }}
        >
          Calculate
        </MKButton>
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
