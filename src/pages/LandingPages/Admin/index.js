import "./admin.css";
import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, TextField, Button } from "@mui/material";
import InputOutlined from "layouts/sections/input-areas/inputs/components/InputOutlined";
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, TextField, Grid, Icon } from "@mui/material";
import MKButton from "components/MKButton";
import "@fontsource/playfair-display";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage, firestore } from "../../../Firebase.js";
import { addDoc, collection } from "firebase/firestore";

const Admin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [basementType, setBasementType] = useState("");
  const [stories, setStories] = useState("");
  const [sizeInterior, setSizeInterior] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Select Property Type");
  const selectedFiles = [];

  const [listingTypeDropdown, setListingTypeDropdown] = useState(null);

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    setPropertyType(type);
    setSelectedPropertyType(type);

    console.log(selectedPropertyType);
    closeDropdown();
  };

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    if (e.target.value === "commercial") {
      setListingType("");
      setBathrooms("");
      setBedrooms("");
      setBasementType("");
      setStories("");
      setSizeInterior("");
      setDescription("");
    }
  };

  const HouseTypes = ["House", "Condo", "Townhouse", "Apartment", "Commercial"];

  const openListingTypeDropdown = ({ currentTarget }) => setListingTypeDropdown(currentTarget);
  const closeListingTypeDropdown = () => setListingTypeDropdown(null);

  const handleListingTypeSelection = (value) => {
    setListingType(value);
    closeListingTypeDropdown();
  };

  const onSelectImagesClicked = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.multiple = true;
    inputElement.click();

    inputElement.addEventListener('change', handleFileSelect);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const maxFiles = 10;

    for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
      selectedFiles.push(files[i]);
    }
    document.getElementById('select-image').innerHTML = `${selectedFiles.length} images selected`;
    console.log("Selected Images:", selectedFiles);
  };

  const handleSubmit = async () => {
    try {
      if (selectedFiles.length === 0) {
        alert("Please select at least one image.");
        return;
      }

      const fileUrls = await Promise.all(selectedFiles.map(uploadFile));
      console.log("File URLs:", fileUrls);

      if (!propertyType || !listingType || !selectedFiles.length || !price || !description || !bedrooms || !basementType || !stories || !sizeInterior || !bathrooms) {
        alert("Please fill in all required fields.");
        return;
      }
      const propertyData = {
        propertyType: propertyType,
        listingType: listingType,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        basementType: basementType,
        stories: stories,
        sizeInterior: sizeInterior,
        description: description,
        price: price,
        timestamp: new Date().getTime(),
        images: fileUrls
      };

      await addDoc(collection(firestore, "properties"), propertyData)
      console.log("Property data saved successfully");
      alert("Property data saved successfully");
      setPropertyType("");
      setListingType("");
      setBathrooms("");
      setBedrooms("");
      setBasementType("");
      setStories("");
      setSizeInterior("");
      setDescription("");
      setPrice("");
      setSelectedPropertyType("Select Property Type");
      selectedFiles.length = 0;
      document.getElementById('select-image').innerHTML = "Select Images";
    } catch (error) {
      console.error("Error saving property data:", error);
    }
  };

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime();
      const filename = `${timestamp}_${file.name}`;

      const storageRef = ref(storage, `images/${filename}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
          console.log('File available at', downloadURL);
        });
        console.log('Uploaded a blob or file!');
      });
    });
  };

  useEffect(() => {
    setSelectedPropertyType(propertyType || "Select Property Type");
  }, [propertyType]);

  const handleBathroomsChange = (e) => {
    const value = e.target.value;
    if (value === "" || value <= 0) {
      // setBathrooms(value);
      alert("Please enter a valid number");
    } else {
      setBathrooms(value);
    }
  };

  const handleBedroomsChange = (e) => {
    const value = e.target.value;
    if (value === "" || value <= 0) {
      // setBedrooms(value);
      alert("Please enter a valid number");
    } else {
      setBedrooms(value);
    }
  };

  const handleBasementTypeChange = (e) => {
    setBasementType(e.target.value);
  };

  const handleStoriesChange = (e) => {
    const value = e.target.value;
    if (value === "" || value <= 0) {
      // setStories(value);
      alert("Please enter a valid number");
    } else {
      setStories(value);
    }
  };

  const handleSizeInteriorChange = (e) => {
    setSizeInterior(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || value <= 0) {
      // setPrice(value);
      alert("Please enter a valid number");
    } else {
      setPrice(value);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("User signed out");
  };

  const handleReviewListings = () => {
    // Add your logic to navigate to review listings page
    console.log("Navigating to review listings");
  };

  return (
    <div className="admin-container">
      <AppBar position="sticky" sx={{ backgroundColor: "#4a86e5" }}>
        <Toolbar>
          <Typography color="#fff" variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button style={{ color: '#fff' }} onClick={handleReviewListings}>Review Listings</Button>
          <Button style={{ color: '#fff' }} onClick={handleSignOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <div className="admin-form">
        <h3>Add Property Posting</h3>
        <Grid container item xs={12} justifyContent="center">
          <MKButton variant="gradient" color="info" onClick={openDropdown} className="equal-width-button">
            {selectedPropertyType || "Select Property Type"} <Icon>expand_more</Icon>
          </MKButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeDropdown}>
            {!selectedPropertyType && <MenuItem onClick={closeDropdown}>Select Property Type</MenuItem>}
            {HouseTypes.map((type, index) => (
              type === "Commercial" && selectedPropertyType === "Commercial" ? null : (
                <MenuItem key={index} onClick={() => handleSelect(type)}>{type}</MenuItem>
              )
            ))}
          </Menu>
          <MKButton variant="gradient" color="info" onClick={openListingTypeDropdown} className="equal-width-button">
            {listingType || "Select Listing Type"} <Icon>expand_more</Icon>
          </MKButton>
          <Menu anchorEl={listingTypeDropdown} open={Boolean(listingTypeDropdown)} onClose={closeListingTypeDropdown}>
            <MenuItem onClick={() => handleListingTypeSelection("For Sale")}>For Sale</MenuItem>
            <MenuItem onClick={() => handleListingTypeSelection("For Rent")}>For Rent</MenuItem>
          </Menu>
          <MKButton id="select-image" variant="gradient" color="info" onClick={onSelectImagesClicked} className="equal-width-button">
            Select Images
          </MKButton>
        </Grid>
        {propertyType === "Commercial" ? (
          <div>
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              value={price}
              onChange={handlePriceChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
          </div>
        ) : (
          <div>
            <TextField
              label="Bathrooms"
              type="number"
              variant="outlined"
              value={bathrooms}
              onChange={handleBathroomsChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Bedrooms"
              type="number"
              variant="outlined"
              value={bedrooms}
              onChange={handleBedroomsChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Basement Type"
              variant="outlined"
              value={basementType}
              onChange={handleBasementTypeChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Stories"
              type="number"
              variant="outlined"
              value={stories}
              onChange={handleStoriesChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Size Interior"
              variant="outlined"
              value={sizeInterior}
              onChange={handleSizeInteriorChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              value={price}
              onChange={handlePriceChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />

          </div>
        )}
        <MKButton
          variant="gradient"
          color="info"
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit
        </MKButton>
      </div>
    </div>
  );
};

export default Admin;
