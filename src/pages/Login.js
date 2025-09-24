import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/test");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://typeback-9gcl.onrender.com/login", {
        email,
        password,
      });

      const role =
        res.data.role || (email === "nishavariya2024.katargam@gmail.com" ? "admin" : "user");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: res.data.username,
          email: res.data.email,
        })
      );
      localStorage.setItem("role", role);

      alert("Login successful!");

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/test");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("https://typeback-9gcl.onrender.com/signup", {
        username,
        email,
        password,
      });

      alert("Signup successful! You can now log in.");
      setIsLoginMode(true);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <>
      <Header />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: { xs: 11,sm: 12, md: 6 }, 
          paddingBottom : { xs: 6,sm: 7, md: 0 },
            paddingRight: { xs: 4,sm: 5, md: 6 },
              paddingLeft: { xs: 4,sm: 15, md: 6 },// responsive padding
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, // responsive padding inside card
            width: { xs: "100%", sm: 400 }, // full width on mobile, fixed width on larger
            maxWidth: "100%",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            textAlign="center"
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            {isLoginMode ? "Login to TypingZone" : "Create an Account"}
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <TextField
              label="Email"
              fullWidth
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                borderRadius: 2,
              }}
              type="submit"
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </Button>
          </form>

          <Button
            variant="text"
            fullWidth
            sx={{
              mt: 2,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
            }}
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;

