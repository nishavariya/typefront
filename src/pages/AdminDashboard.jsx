import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { Users, Award, FileText, Activity } from "lucide-react";
import Sidebar from "../component/Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [scoreCount, setScoreCount] = useState(0);
  const [ActiveCount, setActiveCount] = useState(0);
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndScores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/signup");
        setUserCount(res.data.length);
        setUsers(res.data);

        const scoresRes = await axios.get("http://localhost:5000/api/scores");
        setScoreCount(scoresRes.data.length);
        setScores(scoresRes.data);

        const Actives = await axios.get("http://localhost:5000/api/signup");
        setActiveCount(Actives.data.length);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchUsersAndScores();
  }, []);

  const stats = [
    { title: "Users", value: loading ? "..." : userCount, icon: <Users size={32} /> },
    { title: "Scores", value: loading ? "..." : scoreCount, icon: <Award size={32} /> },
    { title: "Texts", value: 35, icon: <FileText size={32} /> },
    { title: "Actives", value: loading ? "..." : ActiveCount, icon: <Activity size={32} /> },
  ];

  // Chart setup
  const width = 700;
  const height = 350;
  const padding = 50;

  const scaleX = (i, length) =>
    padding + (i * (width - 2 * padding)) / Math.max(length - 1, 1);

  const scaleY = (val, max) =>
    height - padding - (val / max) * (height - 2 * padding);

  const linePath = (data, color, max) => {
    if (!data || data.length === 0) return null;
    const points = data.map((d, i) => `${scaleX(i, data.length)},${scaleY(d, max)}`).join(" ");
    return <polyline fill="none" stroke={color} strokeWidth="2" points={points} />;
  };

  const maxY = Math.max(...scores.map((s) => Math.max(s.wpm, s.accuracy)), 100);

  // ✅ Safe Date Formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    let parsed = new Date(dateStr);

    if (isNaN(parsed)) {
      // Handle DD-MM-YYYY or DD/MM/YYYY manually
      const parts = dateStr.split(/[-/]/);
      if (parts.length === 3) {
        const [d, m, y] = parts; // DD, MM, YYYY
        parsed = new Date(`${y}-${m}-${d}`);
      }
    }

    if (isNaN(parsed)) return "";

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        paddingLeft: { xs: 17, sm: 18, md: 18 },
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      {/* Sidebar */}
      <Box sx={{ flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 2, md: 3 },
          bgcolor: "#f5f5f5",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#0a1929",
            mb: 3,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Welcome Admin 👋
        </Typography>

        {/* Stats */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #f3f4f6, #ffffff)",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <Box sx={{ mb: 1, color: "#1976d2" }}>{stat.icon}</Box>
                  <Typography variant="h6" sx={{ color: "#37474f" }}>
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" } }}
                  >
                    {loading && stat.title === "Users" ? (
                      <CircularProgress size={24} />
                    ) : (
                      stat.value
                    )}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* WPM & Accuracy Chart */}
        <Box
          sx={{
            mt: 5,
            background: "#fff",
            p: { xs: 1.5, sm: 2.5 },
            borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
            overflowX: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            WPM & Accuracy Progress
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : scores.length === 0 ? (
            <Typography>No scores available</Typography>
          ) : (
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                height="auto"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Axes */}
                <line
                  x1={padding}
                  y1={height - padding}
                  x2={width - padding}
                  y2={height - padding}
                  stroke="#aaa"
                />
                <line
                  x1={padding}
                  y1={padding}
                  x2={padding}
                  y2={height - padding}
                  stroke="#aaa"
                />

                {/* Y labels */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const val = (maxY / 4) * i;
                  return (
                    <text
                      key={i}
                      x={10}
                      y={scaleY(val, maxY) + 5}
                      fontSize="12"
                      fill="#555"
                    >
                      {Math.round(val)}
                    </text>
                  );
                })}

                {/* X labels */}
                {scores.map((s, i) => (
                  <text
                    key={s._id || i}
                    x={scaleX(i, scores.length)}
                    y={height - padding + 20}
                    fontSize="12"
                    textAnchor="middle"
                    fill="#555"
                  >
                    {formatDate(s.date)}
                  </text>
                ))}

                {/* Lines */}
                {linePath(
                  scores.map((s) => s.wpm),
                  "blue",
                  maxY
                )}
                {linePath(
                  scores.map((s) => s.accuracy),
                  "green",
                  maxY
                )}
              </svg>
            </Box>
          )}

          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            <span style={{ color: "blue", fontWeight: "bold" }}>● WPM</span>
            <span style={{ color: "green", fontWeight: "bold" }}>● Accuracy</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
