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
    <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Mortgage Calculator</Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Mortgage Amount"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Amortization (years)"
              value={amortizationPeriod}
              onChange={(e) => setAmortizationPeriod(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Interest Rate (%)"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <MKButton
              variant="gradient"
              color="success"
              onClick={calculateMonthlyPayment}
              fullWidth
              sx={{ mt: 2 }}
            >
              Calculate
            </MKButton>
          </Grid>
          <Grid item xs={6}>
            <MKButton
              variant="gradient"
              color="error"
              onClick={() => {
                setMortgageAmount('');
                setInterestRate('');
                setAmortizationPeriod('');
                setMonthlyPayment(null);
              }}
              fullWidth
              sx={{ mt: 2 }}
            >
              Reset
            </MKButton>
          </Grid>
        </Grid>
      </Box>
      {monthlyPayment && (
        <div>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Monthly Mortgage Payment: ${monthlyPayment}
        </Typography>
     
        <h6>
          This calculator is for demonstration purposes only. Always consult with a financial advisor before making any financial decisions.
        </h6>
        </div>
      )}
    </Box>
  );
}

export default MortgageCalculator;