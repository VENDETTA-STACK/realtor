import "./admin.css";
import React, { useState } from "react";
import InputOutlined from "layouts/sections/input-areas/inputs/components/InputOutlined";

const Admin = () => {
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [basementType, setBasementType] = useState("");
  const [stories, setStories] = useState("");
  const [sizeInterior, setSizeInterior] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    if (e.target.value === "commercial") {
      // Reset other fields if property type is commercial
      setListingType("");
      setBathrooms("");
      setBedrooms("");
      setBasementType("");
      setStories("");
      setSizeInterior("");
      setDescription("");
    }
  };

  return (
    <div className="admin-container"> {/* Apply CSS class to center content */}
      <div className="admin-form"> {/* Apply CSS class to style form */}
        <h1>Welcome to the Admin Panel</h1>
        <div>
          <label htmlFor="propertyType">Property Type:</label>
          <select
            id="propertyType"
            value={propertyType}
            onChange={handlePropertyTypeChange}
          >
            <option value="">Select Property Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        {propertyType === "commercial" ? (
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
         
            <label htmlFor="listingType">Listing Type:</label>
            <select
              id="listingType"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
            >
              <option value="">Select Listing Type</option>
              <option value="forSale">For Sale</option>
              <option value="forRent">For Rent</option>
            </select>
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
      </div>
    </div>
  );
};

export default Admin;