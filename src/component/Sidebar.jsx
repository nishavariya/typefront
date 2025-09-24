import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Box,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 45,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width:  { xs: 140,sm: 150, md: 160 },
          boxSizing: "border-box",
          bgcolor: "#435878ff",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Toolbar />
        <List>
          {["Dashboard", "Users", "Scores", "Settings"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              sx={{color:"white"}}
              to={`/${text.toLowerCase()}`} 
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout button at bottom */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
