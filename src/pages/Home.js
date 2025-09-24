import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  useTheme,marginTop
} from "@mui/material";
import {
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import h1 from "../images/h1.jpeg";
import h2 from "../images/h2.png";
// import h3 from "../images/h3.jpeg";
import h4 from "../images/h4.jpg"
import Top from "../component/Top";
import home from "../images/home11.mp4";
const features = [
  {
    title: "Improve Typing Speed",
    desc: "Practice with real-time feedback and instant corrections to build muscle memory and increase speed. Focus on consistent accuracy and rhythm to gradually improve your typing pace. Daily timed tests help sharpen your reflexes and boost confidence in real-world typing tasks.",
    image: h1,
  },
  {
    title: "Completely Free",
    desc: "Enjoy unlimited access to all typing tests, tools, and features without paying a single rupee. No hidden charges, subscriptions, or login required—just start typing instantly. A completely ad-free and distraction-free typing experience, 100% free for everyone.",

    image: h2,
  },
  {
    title: "Track Your Progress",
    desc: "View your complete typing history with detailed WPM and accuracy stats over time. Analyze your strengths and areas for improvement using interactive progress charts. Stay motivated by tracking your daily performance and setting personal goals.",
    image: h4,
  },
];

const faqs = [
  {
    question: "What is this typing test for?",
    answer:
      "This test helps you measure your typing speed (WPM) and accuracy. It’s great for practice or preparing for job tests.",
  },
  {
    question: "How is WPM (Words Per Minute) calculated?",
    answer:
      "WPM is calculated by dividing the total number of characters typed by 5 (a standard word), then dividing by time in minutes.",
  },
  {
    question: "How is accuracy calculated?",
    answer:
      "Accuracy is the percentage of correctly typed words out of the total typed words during the test.",
  },
  {
    question: "Can I practice with different time durations?",
    answer:
      "Currently, our test runs for 60 seconds, but we are working on adding more time options like 30s, 1min, 2min, etc.",
  },
  {
    question: "Do I need to sign up to take the test?",
    answer:
      "No signup is required. You can start typing right away. However, signing up allows saving scores and tracking progress.",
  },
  {
    question: "Is this test mobile-friendly?",
    answer:
      "Yes, the typing test is fully responsive and works on all devices including mobile, tablet, and desktop.",
  },
  {
    question: "Why did I get a low accuracy score even though I typed fast?",
    answer:
      "Speed is just one part. Even one incorrect word reduces accuracy. It's better to type a little slower but more accurately.",
  },
  {
    question: "How can I improve my typing speed?",
    answer:
      "Practice regularly, avoid looking at the keyboard, and focus on accuracy first. Use our practice mode daily to improve.",
  },
  {
    question: "Can I share my results with others?",
    answer:
      "Yes, after completing the test, you can copy your result summary and share it on social media or with friends.",
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Header />
      <Top/>

      {/* Hero Section */}
<Box
  sx={{
    position: "relative",
    minHeight: { xs: "100vh", sm: "100vh", md: "100vh" },
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    px: { xs: 4, sm: 6 }, 
  }}
>
  {/* Background Video */}
  <Box
    component="video"
    src={home}
     allow="autoplay; encrypted-media"
    allowFullScreen
     autoPlay
  loop
  muted
  playsInline
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
       objectFit: "cover",
      zIndex: 0,
      border: 0,
      pointerEvents: "none",
    
    }}
  />

  {/* Dark Overlay */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.45)",
      zIndex: 1,
    }}
  />

  {/* Content */}
  <Box
    sx={{
      position: "relative",
      zIndex: 2,
      maxWidth: { xs: "90%", sm: "80%", md: "70%" },
      mx: "auto",
    }}
  >
    {/* Title */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color="#fff"
        gutterBottom
        sx={{
          fontSize: { xs: "1.9rem", sm: "2.7rem", md: "3.4rem" },
          textShadow: "4px 4px 6px rgba(0,0,0,0.6)",
          lineHeight: 1.2,marginTop:"70px"
        }}
      >
        Welcome to TypingZone
      </Typography>
    </motion.div>

    {/* Subtitle */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#f0f0f0",
          maxWidth: "600px",
          mx: "auto",
          mb: { xs: 3, sm: 4 },
          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
          textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
        }}
      >
        The best place to practice your typing skills, test your speed, and
        challenge yourself daily.
      </Typography>
    </motion.div>

    {/* Button */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Link to="/login">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: { xs: 3, sm: 5 },
            py: { xs: 1.2, sm: 1.6 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: "bold",
            borderRadius: "50px",
            textTransform: "none",
            boxShadow: "0 6px 20px rgba(255,255,255,0.3)",
            transition: "all 0.4s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 30px rgba(255,255,255,0.5)",
              background: "linear-gradient(135deg, #ffffff, #e0e0e0)",
              color: "#1976d2",
            },
          }}
        >
          Start Typing Test 🚀
        </Button>
      </Link>
    </motion.div>
  </Box>
</Box>

{/* Features Section */}
<Box sx={{ py: 8, bgcolor: "#eef1f5" }}>
  <Container>
    <Typography
      variant="h4"
      fontWeight="bold"
      align="center"
      sx={{ mb: 6, color: "#0a1929" }}
    >
      Why TypingZone?
    </Typography>

    <Grid container spacing={4}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: {
                  xs: "column", 
                  sm: "row",    
                },
                alignItems: "center",
                gap: 3,
                borderRadius: 5,
                bgcolor: "#ffffff",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={feature.image}
                alt={feature.title}
                sx={{
                  width: { xs: "100%", sm: "40%" },
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />

              {/* Content */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


      {/* FAQ Section */}
      <Box sx={{ py: 8, bgcolor: "#ffffff" }}>
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ mb: 6, color: "#0a1929" }}
          >
            Frequently Asked Questions
          </Typography>

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
                <AccordionSummary
                  sx={{
                    fontWeight: "bold",
                    bgcolor: "#f4f6f8",
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary" }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Container>
      </Box>

      {/* Footer */}
      {/* <Box
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
      </Box> */}
      <Footer></Footer>
    </Box>
  );
};

export default Home;
