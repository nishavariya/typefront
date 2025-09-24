import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Container,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Sidebar from "../component/Sidebar";

export default function Settings() {
  const [testTime, setTestTime] = useState(60); // default
  const [loading, setLoading] = useState(false);

  // ✅ Fetch current settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/set");
        setTestTime(res.data.testTime);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // ✅ Save updated settings
  const handleSave = async () => {
    try {
  await axios.put("http://localhost:5000/api/set", { testTime });
  alert("✅ Settings updated successfully");
} catch (error) {
  console.error("❌ Error updating settings:", error.response?.data || error.message);
  alert("❌ Failed to update settings: " + (error.response?.data?.details || error.message));
}finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#ffffffff" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          paddingLeft: { xs: 12, sm: 13, md: 15 }, // responsive padding
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" }, // mobile center, desktop top
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              width: "100%",
              borderRadius: 4,
              bgcolor: "#f4f4f4ff",
              boxshadow: "-1px 0px 20px 0px rgb(0 0 0)",
            }}
          >
            {/* Title */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 3,
                color: "#1976d2",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              }}
            >
              ⚙️ Settings
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Test Time Input */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#444",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Default Test Time (seconds)
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={testTime}
                onChange={(e) => setTestTime(Number(e.target.value))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Save Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={loading}
              sx={{
                mt: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#125ea2" },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save Changes"}
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
