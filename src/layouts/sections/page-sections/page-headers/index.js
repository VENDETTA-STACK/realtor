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

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Stack from "@mui/material/Stack";
import MKButton from "components/MKButton";

// PageHeaders page components
import HeaderOne from "layouts/sections/page-sections/page-headers/components/HeaderOne";
import { useLocation } from 'react-router-dom';
import MortgageCalculator from "./MortgageCalculator";

// PageHeaders page components code
// import headerOneCode from "layouts/sections/page-sections/page-headers/components/HeaderOne/code";hgjg

function PageHeaders() {

  const location = useLocation();
  const searchData = new URLSearchParams(location.search);

  return (
    <BaseLayout
      title="Properties"
      breadcrumb={[
        { label: "Properties", route: "/sections/page-sections/page-headers" },
        { label: searchData.get('propertyType') },
      ]}
    >
      <View title="26 SKELTON ST" height="40rem">
        <HeaderOne
        bedrooms={searchData.get('bedrooms')}
        images={searchData.get('images')}
        propertyType={searchData.get('propertyType')}
        listingType={searchData.get('listingType')}
        description={searchData.get('description')}
        stories={searchData.get('stories')}
        bathrooms={searchData.get('bathrooms')}
        sizeInterior={searchData.get('sizeInterior')}
        basementType={searchData.get('basementType')}
        price={searchData.get('price')}
        />
      </View>
      <MKBox>
          <Stack direction="row" spacing={5} mt={-8} mb={2} justifyContent="space-between">
            {/* <MKButton variant="outlined" color="info">Take 3D Tour</MKButton>
            <MKButton variant="contained" color="info">Connect to an agent</MKButton>
            <MKButton variant="outlined" color="info">See all photos</MKButton> */}
          </Stack>
        <Grid container item xs={12} justifyContent="center">
          <MKTypography variant="h4">
            Property Description for 26 SKELTON ST
          </MKTypography>
          <MKTypography variant="subtitle2" mt={2}>
            {searchData.get('description')}
          </MKTypography>
        </Grid>
      </MKBox>
      <MKBox mt={4}>
        <MortgageCalculator />
      </MKBox>
    </BaseLayout>
  );
}

export default PageHeaders;
