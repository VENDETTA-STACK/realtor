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

// PageHeaders page components code
// import headerOneCode from "layouts/sections/page-sections/page-headers/components/HeaderOne/code";

function PageHeaders() {
  return (
    <BaseLayout
      title="Properties"
      breadcrumb={[
        { label: "Properties", route: "/sections/page-sections/page-headers" },
        { label: "26 SKELTON ST" },
      ]}
    >
      <View title="26 SKELTON ST" height="40rem">
        <HeaderOne />
      </View>
      <MKBox>
          <Stack direction="row" spacing={5} mt={-8} mb={2} justifyContent="space-between">
          <MKButton variant="outlined" color="info">Take 3D Tour</MKButton>
            <MKButton variant="contained" color="info">Connect to an agent</MKButton>
            <MKButton variant="outlined" color="info">See all photos</MKButton>
          </Stack>
        <Grid container item xs={12} justifyContent="center">
          <MKTypography variant="h4">
            Property Description for 26 SKELTON ST
          </MKTypography>
          <MKTypography variant="subtitle2" mt={2}>
            Fantastic Opportunity in the Desirable Fieldstone Neighborhood! This Stunning Home With A 3 Car Garage Welcomes You With A Grand Front Double Door Entry. Inside, Enjoy the Spacious Main Floor Layout Featuring 9Ft Ceilings & Premium Hardwood Floors, The Family Room Comes with A Gas Fireplace, And Overlooks The Large Backyard That Widens To 67.78 ft In The Back. You Also Have A Separate Dining Room, and a Convenient Library/Den That Could Also Be Used As A Formal Living Room. The Gourmet Kitchen Is Every Chef's Dream, Boasting a Breakfast Bar, Stainless Steel Appliances, Including a Gas Stove, Large Sink, Stylish Backsplash, And A Large Pantry. Upstairs, You Have An Oversized Primary Bedroom with Double Doors, a Luxurious 5Pc Ensuite, and His/her closets. The Second Bedroom Offers a Private 4Pc Ensuite, While the Third and Fourth Bedrooms Share a 5Pc Semi Ensuite with Double Sinks. The Unspolied **** Walk-Out Basement**** Awaits Your Personal Touch. Enjoy the Convenience of Second Floor Laundry. Whole House Is Freshly Painted With Neutral Colours & Tastefully Decorated. Upgraded 8ft Door Openings, High Baseboards, 200 Amp Service, Plus Much More, Don't Miss Out on This Exceptional Opportunity!!! **** EXTRAS **** Great Location, Few Mins To Orangeville, Hiking Trails, Conservation Park, Hospital, Restaurants, Shopping, All Existing Appliances, All Light Fixtures & All Window Coverings. Your Dream Home Awaits!!!!! (id:38686)
          </MKTypography>
        </Grid>
      </MKBox>
    </BaseLayout>
  );
}

export default PageHeaders;
