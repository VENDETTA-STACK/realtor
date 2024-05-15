import "./admin.css";
import React, { useState, useEffect } from "react";
import InputOutlined from "layouts/sections/input-areas/inputs/components/InputOutlined";
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    setPropertyType(type);
    setSelectedPropertyType(type);
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

  const [listingTypeDropdown, setListingTypeDropdown] = useState(null);

  const openListingTypeDropdown = ({ currentTarget }) => setListingTypeDropdown(currentTarget);
  const closeListingTypeDropdown = () => setListingTypeDropdown(null);

  const handleListingTypeSelection = (value) => {
    setListingType(value);
    closeListingTypeDropdown(); // Close the dropdown after selection
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const handleSubmit = async () => {
    try {

      if (selectedFiles.length === 0) {
        alert("Please select at least one image.");
        return;
      }

      const fileUrls = await Promise.all(selectedFiles.map(uploadFile)); // Upload all files concurrently
      console.log("File URLs:", fileUrls);
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
        images: fileUrls // Assuming fileUrls is an array of image URLs
      };
      await addDoc(collection(firestore, "properties"), propertyData)
      console.log("Property data saved successfully");
    } catch (error) {
      console.error("Error saving property data:", error);
    }
  };

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime(); // Get current timestamp
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
    setBathrooms(e.target.value);
  };
  return (
    <div className="admin-container">
      <div className="admin-form">
        <h2>Add Property Posting</h2>

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
            <InputOutlined
              id="price"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
             <InputOutlined
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <InputOutlined
              id="bathrooms"
              label="Bathrooms"
              type="number"
              onChange={handleBathroomsChange}
            />
            <InputOutlined
              id="bedrooms"
              label="Bedrooms"
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
            <InputOutlined
              id="basementType"
              label="Basement Type"
              value={basementType}
              onChange={(e) => setBasementType(e.target.value)}
            />
            <InputOutlined
              id="stories"
              label="Stories"
              type="number"
              value={stories}
              onChange={(e) => setStories(e.target.value)}
            />
            <InputOutlined
              id="sizeInterior"
              label="Size Interior"
              value={sizeInterior}
              onChange={(e) => setSizeInterior(e.target.value)}
            />
            <InputOutlined
              id="price"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputOutlined
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
            <MKButton 
          variant="gradient" 
          color="info" 
          onClick={handleSubmit}
          style={{ display: 'block', margin: '10px auto' }}
        >
          Submit
        </MKButton>
      </div>
    </div>
  );
};

export default Admin;