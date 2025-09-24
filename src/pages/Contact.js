import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  InputBase,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import Header from "../component/Header";
import axios from "axios";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [type, setType] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setType((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", type);
      setType({ name: "", email: "", subject: "", message: "" });
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending message", error);
      alert("Something went wrong!");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Header />

      {/* Background with gradient */}
      <Box
        sx={{
          width: "100%",
          py: 12,
          background: "linear-gradient(135deg, #d6e7edff, #d1dfe6ff)",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Page Title */}
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                color: "#0d47a1",
                textAlign: "center",
                fontWeight: "bold",
                mb: 1,
              }}
            >
             📞 Contact Us
            </Typography>

            <Typography
              sx={{
                color: "#555",
                textAlign: "center",
                fontSize: "1.1rem",
                mb: 5,
              }}
            >
              We’d love to hear from you! Fill out the form below and our team
              will get back to you shortly.
            </Typography>

            {/* Contact Form Card */}
            <Paper
              elevation={4}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: "16px",
                backgroundColor: "#ffffffcc",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {["name", "email", "subject"].map((field, index) => (
                  <InputBase
                    key={index}
                    name={field}
                    placeholder={`Enter your ${field}`}
                    value={type[field]}
                    onChange={handleChange}
                    required
                    sx={{
                      p: 1.6,
                      border: "1px solid #646464ff",
                      borderRadius: "12px",
                      fontSize: "16px",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                      "&:hover": {
                        borderColor: "#1976d2",
                      },
                      "&:focus-within": {
                        borderColor: "#0d47a1",
                        boxShadow: "0 0 8px rgba(13, 72, 161, 0.23)",
                      },
                    }}
                  />
                ))}

                <Box
                  component="textarea"
                  name="message"
                  placeholder="Your message..."
                  value={type.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  sx={{
                    p: 1.6,
                    border: "1px solid #646464ff",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    resize: "vertical",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    "&:hover": {
                      borderColor: "#1976d2",
                    },
                    "&:focus": {
                      borderColor: "#0d47a1",
                      boxShadow: "0 0 8px rgba(13,71,161,0.2)",
                    },
                  }}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg, #0d47a1, #1976d2)",
                    py: 1.5,
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "12px",
                    transition: "all 0.4s ease",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: "linear-gradient(90deg, #1976d2, #0d47a1)",
                    },
                  }}
                >
                  🚀 Send Message
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ✅ Message sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;
