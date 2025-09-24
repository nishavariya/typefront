// src/pages/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import Sidebar from "../component/Sidebar";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]); // store users
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(""); // error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://typeback-9gcl.onrender.com/api/signup");
        setUsers(res.data); // API se data set karna
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ display: "flex" , paddingLeft:{ xs: 11, sm: 12, md: 13 },}}>
      {/* Sidebar Fixed */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          ml: "19px",
        }}
      >
        {/* Page Header */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#0a1929",
            mb: 3,
          }}
        >
          Manage Users 👥
        </Typography>

        {/* Animated Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={5}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 5,
                }}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography
                variant="h6"
                color="error"
                sx={{ textAlign: "center", p: 3 }}
              >
                {error}
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  {/* Table Head */}
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#1976d2" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        Email
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Table Body */}
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        key={user._id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "white",
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
