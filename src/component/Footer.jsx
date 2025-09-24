import React from 'react'
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
  <Box
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "primary.main",
          color: "#fff",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ready to boost your typing skills?
          </Typography>
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#ffffff",
                color: "primary.main",
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "50px",
                mt: 2,
                textTransform: "none",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                  transform: "scale(1.05)",
                },
              }}
            >
              Take a Test Now
            </Button>
          </Link>

        </motion.div>
        <Typography sx={{ marginTop: "30px", fontWeight: 500, fontSize: "16px", textAlign: "center" }}>
          © {new Date().getFullYear()} Crafted with ❤️ by Nisha Variya
        </Typography>
      </Box>
    
  )
}

export default Footer
