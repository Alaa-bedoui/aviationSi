import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import axios from "axios";

const drawerWidth = 240;

function Home() {
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedColumn, setSelectedColumn] = useState(""); // State for selected column

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear auth tokens, redirect, etc.)
    console.log("User logged out");
  };

  // Function to fetch data for Crews
  const fetchCrewsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getallUsers");
      setItemData(response.data);
      setFilteredData(response.data);
      setSelectedItem("Crews");
    } catch (error) {
      console.error("Error fetching crews data:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = itemData.filter((crew) => {
      if (selectedColumn) {
        return String(crew[selectedColumn])
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      return Object.values(crew).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filtered); // Update the filtered data
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
    setSearchTerm(""); // Clear search term when changing column
    setFilteredData(itemData); // Reset filtered data to show all initially
  };

  // Function to fetch data for Horaires
  const fetchHorairesData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getall");
      setItemData(response.data); // Set the fetched data
      setFilteredData(response.data); // Initialize filtered data
      setSelectedItem("Horaires");
    } catch (error) {
      console.error("Error fetching horaires data:", error);
    }
  };

  // Function to fetch data for Suivi Personnel Navigant
  const fetchSuiviData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/suivi");
      setItemData(response.data); // Set the fetched data
      setFilteredData(response.data); // Initialize filtered data
      setSelectedItem("Suivi Personnel Navigant");
    } catch (error) {
      console.error("Error fetching suivi data:", error);
    }
  };

  // Function to handle item click
  const handleItemClick = (item) => {
    switch (item) {
      case "Crews":
        fetchCrewsData();
        break;
      case "Horaires":
        fetchHorairesData();
        break;
      case "Suivi Personnel Navigant":
        fetchSuiviData();
        break;
      default:
        break;
    }
  };

  // Function to execute when Enter key is pressed
  const handleEnterKey = () => {
    if (searchTerm.trim() && selectedColumn) {
      console.log("enter");

      axios
        .get(
          `http://localhost:3000/api/oneUserBy/${selectedColumn}/${searchTerm}`
        )
        .then((res) => {
          console.log(res.data);
          setFilteredData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user:", err.response?.status);
          console.error("Response data:", err.response?.data);
        });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEnterKey();
    }
  };

  const renderTable = () => {
    if (!selectedItem) return null;

    // Define table headers and body based on selected item
    let headers, rows;

    if (selectedItem === "Crews") {
      headers = [
        "ID",
        "Nom",
        "Prenom",
        "College",
        "Base",
        "Secteur",
        "Absence",
        "Heure du Vol",
        "Conge Annuel",
      ];
      rows = filteredData.map((row) => (
        <TableRow key={row.idcrew}>
          <TableCell>{row.idcrew}</TableCell>
          <TableCell>{row.nom}</TableCell>
          <TableCell>{row.prenom}</TableCell>
          <TableCell>{row.college}</TableCell>
          <TableCell>{row.base}</TableCell>
          <TableCell>{row.secteur}</TableCell>
          <TableCell>{row.absence}</TableCell>
          <TableCell>{row.heurVol}</TableCell>
          <TableCell>{row.congeAnnuel}</TableCell>
        </TableRow>
      ));
    } else if (selectedItem === "Profile") {
      // Example for Profile - adjust as necessary based on your data structure
      headers = ["Name", "Information"];
      rows = itemData.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.info}</TableCell>
        </TableRow>
      ));
    } else if (selectedItem === "Horaires") {
      headers = ["Time", "Details"]; // Example headers
      rows = itemData.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.time}</TableCell>
          <TableCell>{row.details}</TableCell>
        </TableRow>
      ));
    } else if (selectedItem === "Suivi Personnel Navigant") {
      headers = ["Detail", "Value"]; // Example headers
      rows = itemData.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.detail}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      ));
    }

    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: drawerWidth, padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Navigation
          </Typography>
          <Divider />
          <List>
            <ListItem
              button
              sx={{ cursor: "pointer" }}
              onClick={() => handleItemClick("Profile")}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              sx={{ cursor: "pointer" }}
              onClick={() => handleItemClick("Crews")}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Crews" />
            </ListItem>
            <ListItem
              button
              sx={{ cursor: "pointer" }}
              onClick={() => handleItemClick("Horaires")}
            >
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="Horaires" />
            </ListItem>
            <ListItem
              button
              sx={{ cursor: "pointer" }}
              onClick={() => handleItemClick("Suivi Personnel Navigant")}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Suivi Personnel Navigant" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography paragraph>Welcome to the home page!</Typography>
        {/* Search Input */}
        {/* Dropdown for column filtering */}
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2, width: "200px" }}
          onKeyDown={handleKeyDown} // Move here to capture Enter key events
        />
        <Select
          onChange={handleColumnChange}
          displayEmpty
          sx={{ marginBottom: 2, width: "200px" }}
          inputProps={{ "aria-label": "Select column for filtering" }}
          onKeyDown={handleKeyDown}
        >
          <MenuItem value="">
            <em>Select column</em>
          </MenuItem>
          <MenuItem value="nom">Nom</MenuItem>
          <MenuItem value="prenom">Prenom</MenuItem>
          <MenuItem value="college">College</MenuItem>
          <MenuItem value="base">Base</MenuItem>
          <MenuItem value="secteur">Secteur</MenuItem>
          <MenuItem value="absence">Absence</MenuItem>
          <MenuItem value="heurVol">Heure du Vol</MenuItem>
          <MenuItem value="congeAnnuel">Conge Annuel</MenuItem>
        </Select>
        {renderTable()} {/* Render the table based on the selected item */}
      </Box>
    </Box>
  );
}

export default Home;
