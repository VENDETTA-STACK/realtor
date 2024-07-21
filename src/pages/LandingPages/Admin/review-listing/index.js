import "../admin.css";
import React, { useState, useEffect } from "react";
import {
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
  IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../../../Firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MKButton from "components/MKButton";
import { uploadBytes, getDownloadURL, ref, deleteObject } from "firebase/storage";

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
    const listingRef = doc(firestore, "properties", deleteId);
    const listingSnapshot = await getDoc(listingRef);
    const listingData = listingSnapshot.data();

    if (listingData.images) {
      const deletePromises = listingData.images.map((imageURL) => {
        const imageRef = ref(storage, imageURL);
        return deleteObject(imageRef);
      });
      await Promise.all(deletePromises);
    }

    await deleteDoc(listingRef);
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

    const newDocRef = await addDoc(collection(firestore, "properties"), newListingData);
    setListings((prevListings) => [...prevListings, { id: newDocRef.id, ...newListingData }]);
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

  const columns = [
    { field: 'propertyType', headerName: 'Property Type', width: 150 },
    { field: 'listingType', headerName: 'Listing Type', width: 150 },
    { field: 'bathrooms', headerName: 'Bathrooms', width: 100 },
    { field: 'bedrooms', headerName: 'Bedrooms', width: 100 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={listings} columns={columns} pageSize={5} />
      </div>

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
                  <MenuItem key={index} onClick={() => handleSelect(type)}>
                    {type}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <TextField
              margin="dense"
              name="listingType"
              label="Listing Type"
              type="text"
              fullWidth
              value={editData.listingType}
              onChange={handleEditChange}
              required
            />
            <TextField
              margin="dense"
              name="bathrooms"
              label="Bathrooms"
              type="number"
              fullWidth
              value={editData.bathrooms}
              onChange={handleEditChange}
              required
            />
            <TextField
              margin="dense"
              name="bedrooms"
              label="Bedrooms"
              type="number"
              fullWidth
              value={editData.bedrooms}
              onChange={handleEditChange}
              required
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={editData.price}
              onChange={handleEditChange}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={editData.description}
              onChange={handleEditChange}
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this listing?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Delete</Button>
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
                  <MenuItem key={index} onClick={() => handleSelect(type)}>
                    {type}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <TextField
              margin="dense"
              name="listingType"
              label="Listing Type"
              type="text"
              fullWidth
              value={addData.listingType}
              onChange={handleAddChange}
              required
            />
            <TextField
              margin="dense"
              name="bathrooms"
              label="Bathrooms"
              type="number"
              fullWidth
              value={addData.bathrooms}
              onChange={handleAddChange}
              required
            />
            <TextField
              margin="dense"
              name="bedrooms"
              label="Bedrooms"
              type="number"
              fullWidth
              value={addData.bedrooms}
              onChange={handleAddChange}
              required
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={addData.price}
              onChange={handleAddChange}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={addData.description}
              onChange={handleAddChange}
              required
            />
            <MKButton
              variant="gradient"
              color="info"
              onClick={onSelectImagesClicked}
              id="select-image"
              className="equal-width-button"
            >
              Select Images
            </MKButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewListings;
