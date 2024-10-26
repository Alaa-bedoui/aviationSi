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
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [emailError, setemailError] = useState(false);
  const navigate = useNavigate();
  const signUp = () => {
    axios
      .post("http://localhost:3000/api/signUp", formData)
      .then((res) => {
        console.log(res);

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    validateEmail(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateEmail = (e) => {
    if (e.target.name === "email") {
      setemailError(
        !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value)
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
        </Box>
        <TextField
          id="outlined-multiline-flexible"
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={emailError} // Use the error state
          helperText={emailError ? "Please enter a valid email address." : ""}
        />

        <TextField
          id="outlined-multiline-flexible"
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          onClick={() => signUp()}
        >
          Sign Up
        </Button>
        <Button
          color="primary"
          type="submit"
          sx={{ mt: 2, width: 270, marginLeft: 5 }}
          onClick={() => navigate("/login")}
        >
          Déja inscri? Login!
        </Button>
      </Paper>
    </Container>
  );
}

export default SignUp;
