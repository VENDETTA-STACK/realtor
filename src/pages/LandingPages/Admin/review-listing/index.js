import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, TextField, Grid, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import ExampleCard from "pages/Presentation/components/ExampleCard";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../Firebase.js";
const propertiesCollection = collection(firestore, "properties");

const ReviewListings = () => {  

    const [properties, setProperties] = useState([]);

    useEffect(() => {

        async function fetchProperties() {
          try {
            const querySnapshot = await getDocs(propertiesCollection);
            const fetchedProperties = [];
            querySnapshot.forEach((doc) => {
              // Access each document
              console.log(doc.id, " => ", doc.data());
              fetchedProperties.push({ id: doc.id, ...doc.data() })
            });
            setProperties(fetchedProperties);
          } catch (error) {
            console.error("Error fetching posts: ", error);
          }
        }
    
        fetchProperties();
      }, []);
    return (
        <div>
        <AppBar position="sticky" sx={{ backgroundColor: "#4a86e5" }}>
        <Toolbar>
          <Typography color="#fff" variant="h6" sx={{ flexGrow: 1 }}>
            Review Listings
          </Typography>
          <Button style={{ color: '#fff' }} >Create Listing</Button>
          <Button style={{ color: '#fff' }} >Sign Out</Button>
        </Toolbar>
      </AppBar>
        <div style={{ padding: '20px' }}>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {properties.map((propertyIs, index) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={propertyIs.id}>
              <Link 
                to={{
                  pathname: propertyIs.pro ? '/' : '/sections/page-sections/page-headers'
                }}
              >
                {propertyIs.images.map((image, imageIndex) => (
                  <ExampleCard key={`${propertyIs.id}-${imageIndex}`} image={image} description={propertyIs.description} name={`${propertyIs.propertyType} ${index+1}`} count={propertyIs.count} pro={propertyIs.pro} />
                ))}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      </div>
    
        </div>
    );
}

export default ReviewListings;