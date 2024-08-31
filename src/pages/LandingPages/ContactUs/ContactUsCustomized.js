import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Grid } from '@mui/material';

function ContactUsCustomized() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      name: formData.name === '',
      email: formData.email === '' || !validateEmail(formData.email),
      message: formData.message === '',
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      // Form is valid, submit data
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container sx={{ flex: 1, my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Contact Us
        </Typography>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                helperText={errors.name && "Name is required"}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email && "Valid email is required"}
              />

              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={formData.message}
                onChange={handleInputChange}
                error={errors.message}
                helperText={errors.message && "Message is required"}
              />

              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Send Message
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactUsCustomized;
