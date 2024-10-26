import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData
      );
      // If the login is successful
      Swal.fire({
        title: "Success!",
        text: "You have logged in successfully.",
        icon: "success",
        confirmButtonText: "Okay",
      });
      navigate("/home");
    } catch (error) {
      // Handle different error cases
      if (error.response) {
        if (error.response.status === 404) {
          Swal.fire({
            title: "Error!",
            text: "User not found. Please check your email.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            title: "Error!",
            text: "Invalid email or password. Please try again.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Network error. Please check your connection.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    login(); 
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            color="primary"
            type="button"
            sx={{ mt: 2, width: 270, marginLeft: 5 }}
            onClick={() => login("/signup")}
          >
            Nouveau ici? Créez un compte!
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
