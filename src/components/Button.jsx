import React from "react";
import { motion } from "framer-motion";

const Button = ({ onClick, text }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
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
      {text}
    </motion.button>
  );
};

export default Button;
