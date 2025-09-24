
import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Paper, Button, Fade, Slide, Container, } from "@mui/material";
import { styled } from "@mui/system";
import octo from "../images/octo.png";
import trex from "../images/trex.png";
import cheetah from "../images/cheetah.png";
import Header from "../component/Header";
import axios from "axios";

const GradientBackground = styled("div")({
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  background: "radial-gradient(circle at top left, #e0edfaff, #ffffff)",
  zIndex: -2,
  overflow: "hidden",
});

const AnimatedBlob = styled("div")(({ theme }) => ({
  position: "absolute",
  width: 300,
  height: 300,
  borderRadius: "50%",
  background: "radial-gradient(circle at top left, #7eafdcff, #b7cbdbff)",
  animation: "move 10s ease-in-out infinite alternate",
  "@keyframes move": {
    "0%": { top: "10%", left: "10%" },
    "100%": { top: "40%", left: "60%" },
  },
  [theme.breakpoints.down("sm")]: {
    width: 180,
    height: 180,
  },
}));

const TextContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  minHeight: 120,
  padding: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.3)",
  border: "1px solid rgba(227, 220, 220, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "5px 6px 20px rgba(0,0,0,0.1)",
  margin: "0 auto",
  overflowY: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    minHeight: 80,
    padding: theme.spacing(1),
  },
}));

const ResultCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  background: "#f0fdf4",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const WordLine = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  fontFamily: "initial",
  fontSize: "37px",
  lineHeight: "40px",
  gap: "12px",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
    lineHeight: "26px",
    gap: "8px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "28px",
    lineHeight: "34px",
  },
}));

export default function TypingBox({ onFinish }) {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [log, setLog] = useState([]);
  const [timer, setTimer] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackImage, setFeedbackImage] = useState("");
  const [defaultTime, setDefaultTime] = useState(60); 
  const hiddenInputRef = useRef();
  const startTimeRef = useRef(null);
  const logRef = useRef([]);


function ResultSaver({ wpm, accuracy, finished }) {
  const savedRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!finished) return;

    if (mountedRef.current) return;
    mountedRef.current = true;

    if (!savedRef.current) {
      savedRef.current = true; 

      const saveScore = async () => {
        try {
          const username = localStorage.getItem("username") || "Guest";

          await axios.post("https://typeback-9gcl.onrender.com/api/scores", {
            username,
            wpm,
            accuracy,
          });

          console.log("✅ Score saved to backend!");
        } catch (error) {
          console.error("❌ Error saving score:", error);
        }
      };

      saveScore();
    }
  }, [finished, wpm, accuracy]);

  return null;
}

const fetchSettings = async () => {
    try {
      const res = await axios.get("https://typeback-9gcl.onrender.com/api/set");
      if (res.data?.testTime) {
        setTimer(res.data.testTime);
        setDefaultTime(res.data.testTime);
      }
    } catch (err) {
      console.error("❌ Error fetching settings, using default 60:", err);
      setTimer(60);
      setDefaultTime(60);
    }
  };

  const fetchWords = async () => {
    try {
      const res = await fetch("https://random-word-api.vercel.app/api?words=500&length=5");
      const data = await res.json();
      const clean = data.map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
      setWords(clean);
    } catch {
      setWords(["typing", "is", "a", "skill", "you", "can", "improve", "with", "daily", "practice"]);
    }
  };

  useEffect(() => {
     fetchSettings();
    fetchWords();
  }, []);

  useEffect(() => {
    if (started && !finished) {
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            endTest();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [started, finished]);

  const handleKeyDown = (e) => {
    if (finished) return;

    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }

    if (timer <= 0) return;

    if (e.key === " ") {
      e.preventDefault();
      submitCurrentWord();
    } else if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key);
    }
  };

  const submitCurrentWord = () => {
    if (timer <= 0) return;

    const trimmed = input.trim();
    if (!trimmed) return;

    const expected = words[currentIndex];
    const isCorrect = trimmed === expected;

    const newEntry = { len: trimmed.length, isCorrect };
    const newLog = [...logRef.current, newEntry];

    logRef.current = newLog;
    setLog(newLog);
    setInput("");
    setCurrentIndex((prev) => prev + 1);
  };

  const endTest = () => {
    const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
    let updatedLog = [...logRef.current];

    if (input.trim()) {
      const trimmed = input.trim();
      const expected = words[currentIndex] || "";
      const isCorrect = trimmed === expected;

      if (logRef.current.length === currentIndex) {
        updatedLog.push({ len: trimmed.length, isCorrect });
      }
    }

    const correctWords = updatedLog.filter((entry) => entry.isCorrect).length;
    const totalTypedWords = updatedLog.length;

    const calculatedWpm = Math.round(correctWords / elapsedMinutes);
    const acc = totalTypedWords > 0 ? Math.round((correctWords / totalTypedWords) * 100) : 0;

    let msg = "";
    let img = "";

    if (correctWords < 20) {
      msg = "Keep Practicing!😩";
      img = "https://typingspeedtest.app/img/Turtle.webp";
    } else if (correctWords < 30) {
      msg = "Good!👨‍💻";
      img = trex
    } else if (correctWords < 40) {
      msg = "Great Job!🥳";
      img = octo
    } else {
      msg = "Excellent!🤩";
      img = cheetah
    }

    setFeedback(msg);
    setFeedbackImage(img);
    setWpm(calculatedWpm);
    setAccuracy(acc);
    setFinished(true);
    setLog(updatedLog);
    logRef.current = updatedLog;

    onFinish?.({ wpm: calculatedWpm, accuracy: acc });
  };

  const restart = () => {
    setStarted(false);
    setFinished(false);
    setTimer(60);
    setInput("");
    setCurrentIndex(0);
    setLog([]);
    logRef.current = [];
    setWpm(0);
    setAccuracy(0);
    setFeedback("");
    setFeedbackImage("");
    fetchWords();
    hiddenInputRef.current?.focus();
  };

  const renderWord = (word, index) => {
    const isActive = index === currentIndex;
    const entry = log[index];

    if (entry) {
      const color = entry.isCorrect ? "#43a047" : "#e53935";
      return (
        <span key={index} style={{ color, fontWeight: "bold" }}>{word}</span>
      );
    }
    if (finished) {
      return <span key={index} style={{ color: "#555c5fff" }}>{word}</span>;
    }
    if (isActive) {
      return (
        <span key={index} style={{ display: "flex" }}>
          {word.split("").map((char, i) => {
            const typedChar = input[i];
            let color = "#333a3eff";
            if (typedChar === undefined) color = "#333a3eff";
            else if (typedChar === char) color = "#43a047";
            else color = "#e53935";

            const isCursor = i === input.length;

            return (
              <span
                key={i}
                style={{
                  color,
                  borderBottom: isCursor ? "2px solid #1e88e5" : "none",
                  fontWeight: "bold",
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    }
    return <span key={index} style={{ color: "#555c5fff" }}>{word}</span>;
  };
  return (
    <><Header />
      <Box
        sx={{
          pt: 14,
          minHeight: "80vh",
          position: "relative",
          px: { xs: 2, sm: 4 },
        }}
        onClick={() => hiddenInputRef.current?.focus()}
      >
        <GradientBackground>
          <AnimatedBlob />
        </GradientBackground>

        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#004d40",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            }}
          >
            ⚡ Typing Speed Challenge
          </Typography>

          <Typography
            variant="h6"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: 2.5,
              py: 1,
              borderRadius: "50px",
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              color: "#fff",
              fontWeight: 600,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              mb: 3,
            }}
          >
            ⏳ Time Left:
            <Box
              component="span"
              sx={{
                background: "#fff",
                color: "#1976d2",
                borderRadius: "20px",
                px: 1.5,
                py: 0.3,
                fontWeight: 700,
                minWidth: "50px",
                textAlign: "center",
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              {timer}s
            </Box>
          </Typography>


          {words.length > 0 ? (
            <TextContainer>
              <WordLine>
                {words
                  .slice(currentIndex, currentIndex + 8)
                  .map((word, index) =>
                    renderWord(word, currentIndex + index)
                  )}
              </WordLine>
              <input
                ref={hiddenInputRef}
                style={{ position: "absolute", opacity: 0 }}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </TextContainer>
          ) : (
            <Typography variant="h6">Loading words...</Typography>
          )}

          {finished && (
            <>
              <ResultSaver wpm={wpm} accuracy={accuracy} finished={finished} />
              <Slide in direction="up">
                <ResultCard
                  sx={{
                    mt: 5,
                    backdropFilter: "blur(10px)",
                    background: "rgba(240, 253, 244, 0.8)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: { xs: 3, sm: 4, md: 6 },
                    }}
                  >
                    {/* Left Side - Image */}
                    {feedbackImage && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          component="img"
                          src={feedbackImage}
                          alt="result"
                          sx={{
                            width: { xs: "150px", sm: "200px", md: "250px" },
                            height: "auto",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        />
                      </Box>
                    )}

                    {/* Right Side - Stats, Share & Button */}
                    <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
                      <Fade in>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: "#2e7d32",
                            fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
                          }}
                        >
                          ✅ WPM: {wpm}
                        </Typography>
                      </Fade>

                      <Fade in>
                        <Typography
                          variant="h4"
                          sx={{
                            mt: 2,
                            fontWeight: 700,
                            color: "#1565c0",
                            fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
                          }}
                        >
                          🎯 Accuracy: {accuracy}%
                        </Typography>
                      </Fade>



                      <Fade in>
                        <Typography
                          variant="h5"
                          sx={{
                            mt: 3,
                            fontWeight: 600,
                            color: "#37474f",
                            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                          }}
                        >
                          {feedback}
                        </Typography>
                      </Fade>

                      {/* Share Buttons */}
                      <Typography
                        sx={{
                          paddingTop: "10px",
                          fontWeight: 600,
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                        }}
                      >
                        share your score
                      </Typography>

                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          gap: 1.2,
                          flexWrap: "wrap",
                          justifyContent: { xs: "center", md: "flex-start" },
                        }}
                      >
                        {[
                          {
                            label: "📱 WhatsApp",
                            color: "success",
                            link: `https://wa.me/?text=I%20just%20scored%20${wpm}%20WPM%20with%20${accuracy}%25%20accuracy!%20🚀`,
                          },
                          {
                            label: "🐦 Twitter",
                            color: "secondary",
                            link: `https://twitter.com/intent/tweet?text=I%20just%20scored%20${wpm}%20WPM%20with%20${accuracy}%25%20accuracy!%20🚀`,
                          },
                          {
                            label: "📘 Facebook",
                            sx: { color: "#1877f2", borderColor: "#1877f2" },
                            link: `https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com&quote=I%20just%20scored%20${wpm}%20WPM%20with%20${accuracy}%25%20accuracy!%20🚀`,
                          },
                          {
                            label: "💼 LinkedIn",
                            sx: { color: "#0a66c2", borderColor: "#0a66c2" },
                            link: `https://www.linkedin.com/sharing/share-offsite/?url=https://yourwebsite.com&summary=I%20just%20scored%20${wpm}%20WPM%20with%20${accuracy}%25%20accuracy!%20🚀`,
                          },
                        ].map((btn, i) => (
                          <Button
                            key={i}
                            variant="outlined"
                            color={btn.color}
                            sx={{
                              ...(btn.sx || {}),
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            }}
                            onClick={() => window.open(btn.link, "_blank")}
                          >
                            {btn.label}
                          </Button>
                        ))}
                      </Box>

                      {/* Restart Button */}
                      <Button
                        onClick={restart}
                        variant="contained"
                        sx={{
                          mt: 4,
                          px: { xs: 3, sm: 5 },
                          py: { xs: 1.4, sm: 1.8 },
                          fontSize: { xs: "0.95rem", sm: "1.05rem" },
                          borderRadius: "10px",
                          background: "linear-gradient(90deg, #00796b, #004d40)",
                          color: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                            background: "linear-gradient(90deg, #004d40, #00796b)",
                          },
                        }}
                      >
                        🔁 Restart Test
                      </Button>
                    </Box>
                  </Box>
                </ResultCard>
              </Slide></>
          )}
        </Container>
      </Box>

    </>
  );
}

