import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
import ExampleCard from "pages/Presentation/components/ExampleCard";
import data from "pages/Presentation/sections/data/designBlocksData";
import { firestore } from "../../../Firebase.js";
import { getDocs, collection } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const propertiesCollection = collection(firestore, "properties");

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&');
}

function DesignBlocks() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState({ propertyType: '', listingType: '' });

  useEffect(() => {
    async function fetchProperties() {
      try {
        const querySnapshot = await getDocs(propertiesCollection);
        const fetchedProperties = [];
        querySnapshot.forEach((doc) => {
          fetchedProperties.push({ id: doc.id, ...doc.data() });
        });
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties: ", error);
      }
    }
    fetchProperties();
  }, []);

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const filteredProperties = properties.filter(property => 
    (filter.propertyType ? property.propertyType === filter.propertyType : true) &&
    (filter.listingType ? property.listingType === filter.listingType : true)
  );

  const renderData = data.map(({ title }) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={title}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1}>
            Properties
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            A selection of Properties that fit perfectly in any combination
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {filteredProperties.map((property, index) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={property.id}>
              <Link 
                to={{
                  pathname: property.pro ? '/' : '/sections/page-sections/page-headers',
                  search: objectToQueryString(property)
                }}
              >
                {property.images.map((image, imageIndex) => (
                  <ExampleCard key={`${property.id}-${imageIndex}`} image={image} description={property.description} name={`${property.propertyType} ${index+1}`} count={property.count} pro={property.pro} />
                ))}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section" mt={-10} mb={6} py={6}>
      <Container>
        <Grid container item xs={12} lg={6} flexDirection="column" alignItems="center" sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}>
          <MKBadge variant="contained" color="info" badgeContent="Infinite combinations" container sx={{ mb: 2 }} />
          <MKTypography variant="h2" fontWeight="bold">
            Huge collection of Properties
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We have created multiple options for you to choose from.
          </MKTypography>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Property Type"
              name="propertyType"
              value={filter.propertyType}
              onChange={handleFilterChange}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  fontSize: '1rem', // Increase the font size
                  padding: '10px 12px', // Increase padding
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: '0.75rem', // Increase the font size of the label
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              {/* Add more property types as needed */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Listing Type"
              name="listingType"
              value={filter.listingType}
              onChange={handleFilterChange}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  fontSize: '1rem', // Increase the font size
                  padding: '10px 12px', // Increase padding
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: '0.75rem', // Increase the font size of the label
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="For Sale">For Sale</MenuItem>
              <MenuItem value="For Rent">For Rent</MenuItem>
              {/* Add more listing types as needed */}
            </TextField>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default DesignBlocks;
