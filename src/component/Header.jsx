import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const navLinks = ["Home", "Test", "Tips", "Contact Us", "Login"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();


  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username") || localStorage.getItem("user");
    if (user) setUsername(user);
  }, []);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        bgcolor: "white",
        boxShadow: 3,
        zIndex: 1000,
      }}
    >

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Typecore
          </Typography>
        </motion.div> */}



        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Typography
            variant="h5"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              fontSize: {
                xs: "1.2rem", // mobile
                sm: "1.5rem", // tablet
                md: "1.8rem", // laptop
                lg: "2rem",   // desktop
              },
              letterSpacing: { xs: 0.8, sm: 1.3 },
              cursor: "pointer",
              "&:hover": {
                color: "#3e69b2ff",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            Typecore
          </Typography>
        </motion.div>


        {/* Desktop Navigation */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {navLinks.map((link, index) => {
            const path =
              link === "Home"
                ? "/"
                : `/${link.toLowerCase().replace(/\s+/g, "")}`;

            if (link === "Login" && username) return null;

            return (
              <motion.div whileHover={{ scale: 1.1 }} key={index}>
                <Link
                  to={path}
                  style={{
                    textDecoration: "none",
                    color: "#374151",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4f46e5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#374151")
                  }
                >
                  {link}
                </Link>
              </motion.div>
            );
          })}

          {/*Profile if logged in */}
          {username && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleProfileMenu}
                startIcon={<Avatar sx={{ width: 28, height: 28 }}>😀</Avatar>}
                sx={{ textTransform: "none", fontWeight: 600, color: "primary.main" }}
              >

              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={() => setMenuOpen(!menuOpen)} color="primary">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          style={{
            overflow: "hidden",
            background: "white",
            borderTop: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {navLinks.map((link, index) => {
              const path =
                link === "Home"
                  ? "/"
                  : `/${link.toLowerCase().replace(/\s+/g, "")}`;

              if (link === "Login" && username) return null;

              return (
                <Button
                  key={index}
                  component={Link}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    color: "text.primary",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link}
                </Button>
              );
            })}
            {username && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: "text.secondary" }}>
                  Logged in as:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28 }}>
                    😀
                  </Avatar>
                </Box>
                <Button
                  onClick={handleLogout}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    color: "error.main",
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </motion.div>
      )}
    </Box>
  );
};
export default Header;




