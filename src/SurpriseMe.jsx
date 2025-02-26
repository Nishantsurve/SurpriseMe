import React, { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GIPHY_API_KEY = "9z1kpjNsGO7a3LVABU20FB3OfbCQnJYj"; // Replace with your actual Giphy API Key

const SurpriseMe = () => {
  const [message, setMessage] = useState("Click the button for a surprise!");
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(to right, #ff9a9e, #fad0c4)"
  );
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [streak, setStreak] = useState(0);
  const [play] = useSound("/surprise.mp3");

  const colors = [
    "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf",
    "#9bf6ff", "#a0c4ff", "#bdb2ff",
  ];

  const fetchJokeAndGif = async () => {
    setLoading(true);
    try {
      const jokeRes = await fetch("https://official-joke-api.appspot.com/random_joke");
      const jokeData = await jokeRes.json();
      const jokeText = `${jokeData.setup} - ${jokeData.punchline}`;
      setMessage(jokeText);

      const keyword = jokeData.punchline.split(" ")[0];
      const gifRes = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=1`
      );
      const gifData = await gifRes.json();

      setGif(
        gifData.data.length > 0 ? gifData.data[0].images.fixed_height.url : null
      );
      toast.success(" Surprise generated! ");
    } catch (error) {
      setMessage("Oops! Couldn't fetch a joke. Try again!");
      setGif(null);
    }
    setLoading(false);
  };

  const handleClick = () => {
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    setBgGradient(`linear-gradient(to right, ${color1}, ${color2})`);

    play();
    confetti({ particleCount: 150, spread: 90 });
    fetchJokeAndGif();
    setStreak(prevStreak => {
      const newStreak = prevStreak + 1;
      if (newStreak % 4 === 0) {
        toast.success("🔥 Streak Bonus! Keep going! 🔥");
      }
      return newStreak;
    });
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${message}\n${gif ? gif : ""}`
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        background: bgGradient,
        minHeight: "100vh",
        textAlign: "center",
        padding: "50px",
        transition: "background 0.5s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <motion.h1
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "20px",
        }}
      >
        {name ? `Hey ${name}, Surprise Me! 🎉` : "Surprise Me App 🎉"}
      </motion.h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", marginBottom: "15px" }}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        style={{
          padding: "15px 30px",
          fontSize: "20px",
          cursor: "pointer",
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          color: "white",
          border: "none",
          borderRadius: "50px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
          marginBottom: "10px",
        }}
      >
        🎁 Surprise Me
      </motion.button>

      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
        Streak: {streak}
      </p>

      <motion.p
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold", color: "#fff" }}
      >
        {message}
      </motion.p>

      {loading ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          style={{ width: "100px", height: "100px", background: "#fff", border: "4px solid #ff4b2b", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", marginTop: "20px" }}
        >
          🎁
        </motion.div>
      ) : (
        gif && <motion.img src={gif} alt="GIF" animate={{ scale: [0.5, 1] }} transition={{ duration: 0.5 }} style={{ width: "250px", marginTop: "20px", borderRadius: "10px" }} />
      )}

      <button onClick={shareOnWhatsApp} style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px", borderRadius: "5px", cursor: "pointer" }}>📲 Share on WhatsApp</button>
    </div>
  );
};

export default SurpriseMe;
