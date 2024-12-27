/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import houseImage from 'house.jpg';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DrawerAppBar from "examples/Navbars/DefaultNavbar/CustomizeNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
// import Pages from "pages/Presentation/sections/Pages";
import Testimonials from "pages/Presentation/sections/Testimonials";
import Download from "pages/Presentation/sections/Download";
// Presentation page components
// import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

import footerRoutes from "footer.routes";
import MKButton from "components/MKButton";
import CollectUserInformationModal from "./sections/CollectUserInformationModal";

// console.log(await fetchPosts())

// Call the fetchPosts function wherever needed
// fetchPosts();

// Images
// import bgImage from "assets/images/bg-presentation.jpg";

function Presentation() {

  // Create a reference for the DesignBlocks component
  const designBlocksRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Function to scroll to the DesignBlocks component
  const scrollToDesignBlocks = () => {
    designBlocksRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();

  const redirectToAdmin = () => {
    // navigate('/admin'); 
    setModalOpen(true);
  };

  const scrollToProperties = () => {
    const element = document.querySelector('.properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <DrawerAppBar
        // routes={routes}
        sticky
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${houseImage})`,
          // backgroundImage: `url(${RealtorImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
  <Container sx={{ position: "relative", zIndex: 2, mt: 8 }}>
  <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
    {/* Title */}
    <MKTypography
      variant="h1"
      sx={({ breakpoints, typography: { size } }) => ({
        [breakpoints.down("md")]: {
          fontSize: size["3xl"],
        },
        color: "#ffcc00",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)"
      })}
    >
      Realtor Chintan Patel
    </MKTypography>

    {/* Subtitle */}
    <MKTypography
      variant="body1"
      textAlign="center"
      px={{ xs: 6, lg: 12 }}
      mt={1}
      sx={{
        color: "#ffcc00", // Change this to your desired text color (e.g., yellow)
        textShadow: "1px 1px 5px rgba(0, 0, 0, 1.2)",
        fontWeight: "bold",
      }}
    >
      We make finding your dream property effortless and stress-free. Whether you're searching for your next home, investment property, or vacation getaway, our platform offers an unparalleled experience tailored to your needs.
    </MKTypography>
  </Grid>
</Container>

      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >

        <Grid container>
          <Grid item xs={12} style={{textAlign: "center"}}>
            <Box m={1} display="inline">
              <MKButton color="info" onClick={() => { window.location.hash = "#properties"; }}>Buy</MKButton>
            </Box>
            <Box m={1} display="inline">
              <MKButton color="info" onClick={ () => redirectToAdmin() } >Sell</MKButton>
            </Box>  
          </Grid>
        </Grid>

        {/* <Counters /> */}
        
        {/* { false && <Information /> } */}
        
        <div id="properties">
        <DesignBlocks  style={{ marginTop: '-100px' }} />
        </div>
        {/* <Pages />
        <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container> */}
        {false && <>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                variant="gradient"
                color="info"
                icon="flag"
                title="Getting Started"
                description="Check the possible ways of working with our product and the necessary files for building your own project."
                action={{
                  type: "external",
                  route: "https://www.creative-tim.com/learning-lab/react/overview/material-kit/",
                  label: "Let's start",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="precision_manufacturing"
                title="Plugins"
                description="Get inspiration and have an overview about the plugins that we used to create the Material Kit."
                action={{
                  type: "external",
                  route: "https://www.creative-tim.com/learning-lab/react/overview/datepicker/",
                  label: "Read more",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="apps"
                title="Components"
                description="Material Kit is giving you a lot of pre-made components, that will help you to build UI's faster."
                action={{
                  type: "external",
                  route: "https://www.creative-tim.com/learning-lab/react/alerts/material-kit/",
                  label: "Read more",
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <Testimonials />
        <Download /></>}
        <MKBox pt={18} pb={6} textAlign="center">
  <Container>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} lg={8}>
        <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
          Thank you for trusting us!
        </MKTypography>
        <MKTypography variant="body1" color="text">
          Helping you find the perfect home, every time.
        </MKTypography>
      </Grid>
    </Grid>
  </Container>
</MKBox>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
      <CollectUserInformationModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}

export default Presentation;
