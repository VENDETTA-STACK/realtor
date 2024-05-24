import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import DrawerAppBar from "examples/Navbars/DefaultNavbar/CustomizeNavbar";
import RealtorImage from '../../../assets/images/realtor3.JPEG'

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO',
    image: RealtorImage
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: RealtorImage
  },
  {
    name: 'Alice Johnson',
    role: 'Lead Developer',
    image: RealtorImage
  }
];

function CustomizeAboutUs() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DrawerAppBar />
      <Container sx={{ flex: 1 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="h5" paragraph align="center">
            Welcome to Realtor, where we help you find your dream home.
          </Typography>
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to provide exceptional real estate services to our clients by 
            offering personalized and professional guidance throughout the home buying and 
            selling process. We strive to build long-lasting relationships based on trust, 
            integrity, and customer satisfaction.
          </Typography>
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.name}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default CustomizeAboutUs;
