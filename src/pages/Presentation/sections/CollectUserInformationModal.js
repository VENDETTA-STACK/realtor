import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import MKButton from 'components/MKButton';
import MKBox from 'components/MKBox';

const CollectUserInformationModal = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the collected data to the server to send an email
    try {
      //   await axios.post('/api/send-email', { name, email, contact });
      //   alert('Email sent successfully');
      //   handleClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <MKBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', // Adjusted for smaller screens
          maxWidth: 400, // Maximum width for larger screens
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Contact Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
            sx={{ mb: 2 }} // Adjust spacing between fields
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            sx={{ mb: 2 }} // Adjust spacing between fields
          />
          <TextField
            label="Contact"
            fullWidth
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            margin="normal"
            sx={{ mb: 2 }} // Adjust spacing between fields
          />
          <TextField
            label="Description"
            id="outlined-multiline-static"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            fullWidth
            rows={4}
            required
            sx={{ mb: 2 }} // Adjust spacing between fields
          />
          <MKButton type="submit" variant="contained" color="info" sx={{ mt: 2 }}>
            Submit
          </MKButton>
        </form>
      </MKBox>
    </Modal>
  );
};

export default CollectUserInformationModal;
