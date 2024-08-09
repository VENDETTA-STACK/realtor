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
            Meet Chintan Patel
          </Typography>
          <Typography variant="body1" paragraph>
          Purchasing a house or buying an investment property for the future is a very important decision that can have huge financial impact on your life.  The biggest investment you will probably make in your life will most probably be a real estate investment. This is where you will need a professional realtor who can help you navigate with whole process of either buying or selling your home.
          Meet, your Realtor Chintan Patel
          Chintan Patel pursued Bachelor of Business Administration from York University and has worked for major corporations such as TD Canada Trust and Investors Group. Now pursing career in real estate, Chintan brings excellent customer service and negotiating skills for his clients. Chintan not only specializes in residential properties but is very experienced on the commercial side, especially in fast food industry. Owning few fast-food restaurants across GTA, Chintan has ample of experience is buying, selling or leasing commercial properties.
          With the experience of his brokerage and team of over 300 realtors, Chintan will ensure that his clients will get the best deal that suits their needs, whether it is buying their dream home or dream of owing their own business.  
          </Typography>
        </Box>
        {/* <Box sx={{ my: 4 }}>
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
        </Box> */}
      </Container>
    </Box>
  );
}

export default CustomizeAboutUs;
