/* eslint-disable no-param-reassign */
/**
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
import Container from "@mui/material/Container";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";

function InputOutlined(prop) {
  return (
    <MKBox component="section" py={1}>
      <Container>
          <MKInput label={prop.label} fullWidth  type={prop.type} multiline={prop.multiline} rows={prop.rows}/>
      </Container>
    </MKBox>
  );
}

export default InputOutlined;
