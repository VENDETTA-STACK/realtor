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
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles

function HeaderOne({ bedrooms, images, propertyType, listingType, description, stories, bathrooms, sizeInterior, basementType, price }) {
  return (
    <MKBox component="header" position="relative" height="100%">
      <MKBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
      >
        <Carousel showThumbs={false} infiniteLoop autoPlay showStatus={false} showIndicators={false}>
          {images.map((image, index) => (
            <div key={index}>
              <MKBox
                component="img"
                src={image}
                alt={`Property Image ${index + 1}`}
                width="100%"
                height="100%"
                sx={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
      </MKBox>
      <MKBox
        display="flex"
        alignItems="end"
        minHeight="100%"
        position="relative"
        zIndex={2}
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>
          <Grid mb={2} container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="start">
            <MKTypography
              variant="h1"
              color="white"
              mb={3}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              26 SKELTON ST
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={1} pr={6} mr={6}>
              Mono, ON, L9W 6W9
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={1} pr={6} mr={6}>
              {bedrooms} bed, {bathrooms} bath {propertyType}
            </MKTypography>
            <Stack direction="row" spacing={2} mt={3}>
              <MKButton color="primary">${price}</MKButton>
              {/* <MKButton color="secondary">3D Tour</MKButton>
              <MKButton color="secondary"><Icon>favorite</Icon>&nbsp;Add to favorites</MKButton> */}
            </Stack>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

HeaderOne.propTypes = {
  bedrooms: PropTypes.string.isRequired,
  bathrooms: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  propertyType: PropTypes.string.isRequired,
  listingType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stories: PropTypes.string.isRequired,
  sizeInterior: PropTypes.string.isRequired,
  basementType: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default HeaderOne;
