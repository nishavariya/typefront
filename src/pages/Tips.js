// src/Pages/Tips.jsx
import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import t1 from "../images/t1.webp";
import t2 from "../images/t2.webp";
import t3 from "../images/t3.webp";
import t4 from "../images/t4.webp";
import t5 from "../images/t5.webp";
import t6 from "../images/t6.webp";
import t7 from "../images/t7.webp";
import t8 from "../images/t8.jpg";
import t9 from "../images/t9.jpg";
import t10 from "../images/t10.webp";
import Header from "../component/Header";
import Top from "../component/Top";
import Footer from "../component/Footer";

const tips = [
  {
    title: "1 - Fingers Position",
    description:
      "Always place your fingers on the Home Row keys: A, S, D, F, and J, K, L, ;. Your fingers should always return to the home row position. This helps to increase typing speed and accuracy.",
    image: t1,
  },
  {
    title: "2 - Do Not Look at the Keyboard",
    description:
      "Don't look at the keyboard when you type. Use the bumps on the “F” and “J” keys to position your fingers and type looking at the screen. Make a habit of looking at the screen instead of the keyboard while typing. This enhances muscle memory and helps you type faster over time.",
    image: t2,
  },
  {
    title: "3 - Read ahead of what you're typing in a Good Posture",
    description:
      "While typing you must always know the word that will come next. To do this, try to read 1 or 2 words ahead of what you're typing. This way you will be able to type continuously, as you don't have to stop to read the current word you have to type.",
    image: t3,
  },
  {
    title: "4 - Focus on accuracy",
    description:
      "Having a good accuracy, that is, typing everything (or almost everything) correctly, is one of the most important things to improve your typing skills. You should always aim to maintain an accuracy above 96% and speed will come naturally with practice.",
    image: t4,
  },
  {
    title: "5 - Practice Regularly",
    description:
      "The key to improving typing speed and accuracy is regular practice. Spend at least 10-15 minutes a day practicing touch typing. To be consistent is to continue throughout the days the activities that lead to a goal.",
    image: t5,
  },
  {
    title: "6 - Choose a good keyboard",
    description:
      "Choosing a good keyboard is essential for you to achieve high typing speeds. Good quality keyboards are comfortable, fast and have soft and stable keys. This allows you to type much faster and for much longer.",
    image: t6,
  },
  {
    title: "7 - Use the keyboard shortcuts",
    description:
      "You can use some keyboard shortcuts to make corrections faster. CTRL + Backspace, for example, will delete the whole word before the cursor. CTRL + Del, otherwise, will delete the word after the cursor. You can also use CTRL + Right arrow or CTRL + Left arrow to move the cursor to the end or the beginning of the current word, respectively.",
    image: t7,
  },
  {
    title: "8 - Stay Relaxed",
    description:
      "Keep your hands and body relaxed while typing. Do not press the keys too hard. Tension can slow you down and cause fatigue. Typing for a long time without breaks leads to mental and physical fatigue. That way, mistakes increase and you end up typing slower.",
    image: t8,
  },
  {
    title: "9 - Learn from Mistakes",
    description:
      "Mistakes are an essential part of the learning process. Instead of feeling discouraged, take each error as a chance to grow. After each typing session, identify where you struggled — whether it's specific keys, hand positioning, or frequent typos.",
    image: t9,
  },
  {
    title: "10 - Set Goals",
    description:
      "Set short-term and long-term typing goals. Track your WPM (Words Per Minute) and aim to improve step by step. Setting goals is essential in any project, as they serve as motivation and provide a sense of direction for those engaged in the pursuit of an objective.",
    image: t10,
  },
];

const Tips = () => {
  return (
    <Box sx={{ paddingTop: { xs: "70px", md: "90px" } }}>
      <Header />
      <Top />

      <Container sx={{ py: { xs: 3, sm: 5 } }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.8rem" },
          }}
        >
          👨‍💻 Typing Tips
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.15rem" },
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          Improve your typing skills with these expert tips.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {tips.map((tip, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: "#f9f9f9",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
                    }}
                  >
                    {tip.title}
                  </Typography>

                  {/* ✅ Image full visible (no cropping) */}
                  <Box
                    component="img"
                    src={tip.image}
                    alt={tip.title}
                    sx={{
                      width: "100%",
                      maxHeight: { xs: 280, sm: 340, md: 400 }, // control height but keep aspect ratio
                      objectFit: "contain", // ✅ show full image
                      mb: 2,
                      borderRadius: 2,
                    }}
                  />

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, flexGrow: 1 }}
                  >
                    {tip.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

export default Tips;
