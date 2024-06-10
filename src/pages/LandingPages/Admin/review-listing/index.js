import "../admin.css";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Menu,
  MenuItem,
  Icon,
  Grid,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { firestore, storage } from "../../../../Firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MKButton from "components/MKButton";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const ReviewListings = () => {
  const [listings, setListings] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [listingTypeDropdown, setListingTypeDropdown] = useState(null);
  const selectedFiles = [];
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addData, setAddData] = useState({
    propertyType: "",
    listingType: "",
    bathrooms: "",
    bedrooms: "",
    basementType: "",
    stories: "",
    sizeInterior: "",
    description: "",
    price: "",
  });

  const fetchListings = async () => {
    const querySnapshot = await getDocs(collection(firestore, "properties"));
    const listingsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setListings(listingsData);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleEditClick = (listing) => {
    setEditData(listing);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteDoc(doc(firestore, "properties", deleteId));
    setListings((prevListings) => prevListings.filter((listing) => listing.id !== deleteId));
    setOpenDeleteDialog(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    const listingRef = doc(firestore, "properties", editData.id);
    await updateDoc(listingRef, editData);
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === editData.id ? editData : listing
      )
    );
    setOpenEditDialog(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSave = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const fileUrls = await Promise.all(selectedFiles.map(uploadFile));
    const newListingData = { ...addData, images: fileUrls, timestamp: new Date().getTime() };

    await addDoc(collection(firestore, "properties"), newListingData);
    setListings((prevListings) => [...prevListings, { id: newListingData.timestamp, ...newListingData }]);
    setOpenAddDialog(false);
    setAddData({
      propertyType: "",
      listingType: "",
      bathrooms: "",
      bedrooms: "",
      basementType: "",
      stories: "",
      sizeInterior: "",
      description: "",
      price: "",
    });
    selectedFiles.length = 0;
  };

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    setEditData((prevData) => ({
      ...prevData,
      propertyType: type,
    }));
    closeDropdown();
  };

  const openListingTypeDropdown = ({ currentTarget }) => setListingTypeDropdown(currentTarget);
  const closeListingTypeDropdown = () => setListingTypeDropdown(null);

  const handleListingTypeSelection = (value) => {
    setEditData((prevData) => ({
      ...prevData,
      listingType: value,
    }));
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

  const HouseTypes = ["House", "Condo", "Townhouse", "Apartment", "Commercial"];

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: "#4a86e5" }}>
        <Toolbar>
          <Typography color="#fff" variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <MKButton variant="gradient" color="info" onClick={() => setOpenAddDialog(true)}>
            Add Listing
          </MKButton>
        </Toolbar>
      </AppBar>
      <h2>Review Listings</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property Type</TableCell>
              <TableCell>Listing Type</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell style={{width: 100}} >{listing.propertyType}</TableCell>
                <TableCell>{listing.listingType}</TableCell>
                <TableCell>{listing.bathrooms}</TableCell>
                <TableCell>{listing.bedrooms}</TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell>{listing.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(listing)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(listing.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Listing</DialogTitle>
        <DialogContent>
          <div className="admin-form">
            <Grid container item xs={12} justifyContent="center">
              <MKButton variant="gradient" color="info" onClick={openDropdown} className="equal-width-button">
                {editData.propertyType || "Select Property Type"} <Icon>expand_more</Icon>
              </MKButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeDropdown}>
                {!editData.propertyType && <MenuItem onClick={closeDropdown}>Select Property Type</MenuItem>}
                {HouseTypes.map((type, index) => (
                  <MenuItem key={index} onClick={() => handleSelect(type)}>{type}</MenuItem>
                ))}
              </Menu>
              <MKButton variant="gradient" color="info" onClick={openListingTypeDropdown} className="equal-width-button">
                {editData.listingType || "Select Listing Type"} <Icon>expand_more</Icon>
              </MKButton>
              <Menu anchorEl={listingTypeDropdown} open={Boolean(listingTypeDropdown)} onClose={closeListingTypeDropdown}>
                <MenuItem onClick={() => handleListingTypeSelection("For Sale")}>For Sale</MenuItem>
                <MenuItem onClick={() => handleListingTypeSelection("For Rent")}>For Rent</MenuItem>
              </Menu>
              <MKButton id="select-image" variant="gradient" color="info" onClick={onSelectImagesClicked} className="equal-width-button">
                Select Images
              </MKButton>
            </Grid>
            <TextField
              label="Bathrooms"
              type="number"
              variant="outlined"
              name="bathrooms"
              value={editData.bathrooms}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Bedrooms"
              type="number"
              variant="outlined"
              name="bedrooms"
              value={editData.bedrooms}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Basement Type"
              variant="outlined"
              name="basementType"
              value={editData.basementType}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Stories"
              type="number"
              variant="outlined"
              name="stories"
              value={editData.stories}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Size Interior"
              variant="outlined"
              name="sizeInterior"
              value={editData.sizeInterior}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              name="price"
              value={editData.price}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Listing</DialogTitle>
        <DialogContent>
          <div className="admin-form">
            <Grid container item xs={12} justifyContent="center">
              <MKButton variant="gradient" color="info" onClick={openDropdown} className="equal-width-button">
                {addData.propertyType || "Select Property Type"} <Icon>expand_more</Icon>
              </MKButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeDropdown}>
                {!addData.propertyType && <MenuItem onClick={closeDropdown}>Select Property Type</MenuItem>}
                {HouseTypes.map((type, index) => (
                  <MenuItem key={index} onClick={() => setAddData((prevData) => ({ ...prevData, propertyType: type }))}>
                    {type}
                  </MenuItem>
                ))}
              </Menu>
              <MKButton variant="gradient" color="info" onClick={openListingTypeDropdown} className="equal-width-button">
                {addData.listingType || "Select Listing Type"} <Icon>expand_more</Icon>
              </MKButton>
              <Menu anchorEl={listingTypeDropdown} open={Boolean(listingTypeDropdown)} onClose={closeListingTypeDropdown}>
                <MenuItem onClick={() => setAddData((prevData) => ({ ...prevData, listingType: "For Sale" }))}>For Sale</MenuItem>
                <MenuItem onClick={() => setAddData((prevData) => ({ ...prevData, listingType: "For Rent" }))}>For Rent</MenuItem>
              </Menu>
              <MKButton id="select-image" variant="gradient" color="info" onClick={onSelectImagesClicked} className="equal-width-button">
                Select Images
              </MKButton>
            </Grid>
            <TextField
              label="Bathrooms"
              type="number"
              variant="outlined"
              name="bathrooms"
              value={addData.bathrooms}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Bedrooms"
              type="number"
              variant="outlined"
              name="bedrooms"
              value={addData.bedrooms}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Basement Type"
              variant="outlined"
              name="basementType"
              value={addData.basementType}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Stories"
              type="number"
              variant="outlined"
              name="stories"
              value={addData.stories}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Size Interior"
              variant="outlined"
              name="sizeInterior"
              value={addData.sizeInterior}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              name="price"
              value={addData.price}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              name="description"
              value={addData.description}
              onChange={handleAddChange}
              sx={{ width: '80%', marginBottom: '16px' }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this listing?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewListings;
