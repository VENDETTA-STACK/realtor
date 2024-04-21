import "./admin.css";
import React, { useState, useEffect } from "react";
import InputOutlined from "layouts/sections/input-areas/inputs/components/InputOutlined";
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MKButton from "components/MKButton";

const Admin = () => {
  const [dropdown, setDropdown] = useState(null);
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

  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = (value) => {
    setDropdown(null);
    console.log(value);
    setPropertyType(value); // Set the property value here
  }

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

  const [listingTypeDropdown, setListingTypeDropdown] = useState(null);

  const openListingTypeDropdown = ({ currentTarget }) => setListingTypeDropdown(currentTarget);
  const closeListingTypeDropdown = () => setListingTypeDropdown(null);

  const handleListingTypeSelection = (value) => {
    setListingType(value);
    closeListingTypeDropdown(); // Close the dropdown after selection
  };

  useEffect(() => {
    setSelectedPropertyType(propertyType || "Select Property Type");
  }, [propertyType]);

  return (
    <div className="admin-container">
      <div className="admin-form">
        <h2>Add Property Posting</h2>

        <Grid container item xs={12} justifyContent="center">
          {/* Wrap the Grid component in a container Grid */}
          <MKButton variant="gradient" color="info" onClick={openDropdown}>
            {selectedPropertyType} <Icon>expand_more</Icon>
          </MKButton>
          <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
            {!propertyType && <MenuItem onClick={closeDropdown}>Select Property Type</MenuItem>}
            <MenuItem onClick={() => closeDropdown("House")}>House</MenuItem>
            <MenuItem onClick={() => closeDropdown("Condo")}>Condo</MenuItem>
            <MenuItem onClick={() => closeDropdown("Townhouse")}>Townhouse</MenuItem>
            <MenuItem onClick={() => closeDropdown("Apartment")}>Apartment</MenuItem>
            <MenuItem onClick={() => closeDropdown("Commercial")}>Commercial</MenuItem>
          </Menu>
        </Grid>

        {propertyType === "Commercial" ? (
          <div>
            <InputOutlined
              id="price"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <Grid container item xs={12} justifyContent="center">
              <MKButton variant="gradient" color="info" onClick={openListingTypeDropdown}>
                {listingType || "Select Listing Type"} <Icon>expand_more</Icon>
              </MKButton>
              <Menu anchorEl={listingTypeDropdown} open={Boolean(listingTypeDropdown)} onClose={closeListingTypeDropdown}>
                <MenuItem onClick={() => handleListingTypeSelection("For Sale")}>For Sale</MenuItem>
                <MenuItem onClick={() => handleListingTypeSelection("For Rent")}>For Rent</MenuItem>
              </Menu>
            </Grid>
            <InputOutlined
              id="bathrooms"
              label="Bathrooms"
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
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
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
              <MKButton variant="gradient" color="info" onClick={() => console.log("Submit")}> Submit </MKButton> 

      </div>
    </div>
  );
};

export default Admin;