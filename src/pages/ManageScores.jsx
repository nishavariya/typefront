import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TableContainer,
} from "@mui/material";
import Sidebar from "../component/Sidebar";
import axios from "axios";

export default function ManageScores() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 API Call
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get("https://typeback-9gcl.onrender.com/api/scores");
        setRows(res.data);
      } catch (err) {
        console.error("Error fetching scores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <Box sx={{ display: "flex" , paddingLeft:{ xs: 11, sm: 12, md: 13 },}}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },  
          
        }}
      >
        <Container maxWidth="xl">
          {/* Page Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#0d47a1",
              mb: 3,
              textAlign: "center",
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
            }}
          >
            Manage Scores
          </Typography>

          {/* Stylish Table Card */}
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              p: { xs: 1, sm: 2 },
              bgcolor: "#f9fafc",
            }}
          >
            {loading ? (
              <Box
                sx={{ display: "flex", justifyContent: "center", p: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: "70vh" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#275cadff" }}>
                      <TableCell
                        sx={{ color: "white",bgcolor: "#275cadff", fontWeight: "bold" }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{ color: "white",bgcolor: "#275cadff", fontWeight: "bold" }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        sx={{ color: "white",bgcolor: "#275cadff", fontWeight: "bold" }}
                      >
                        WPM
                      </TableCell>
                      <TableCell
                        sx={{ color: "white",bgcolor: "#275cadff", fontWeight: "bold" }}
                      >
                        Accuracy
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          bgcolor: index % 2 === 0 ? "#e3f2fd" : "white",
                          "&:hover": {
                            bgcolor: "#bbdefb",
                            transition: "0.3s",
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", color: "#1a237e" }}
                        >
                          {row.username}
                        </TableCell>
                        <TableCell
                          sx={{ color: "#2e7d32", fontWeight: 500 }}
                        >
                          {row.wpm}
                        </TableCell>
                        <TableCell
                          sx={{ color: "#ef6c00", fontWeight: 500 }}
                        >
                          {row.accuracy}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
