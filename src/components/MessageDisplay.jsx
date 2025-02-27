import React from "react";
import { motion } from "framer-motion";

const MessageDisplay = ({ message }) => {
  return (
    <motion.p
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold", color: "#fff" }}
    >
      {message}
    </motion.p>
  );
};

export default MessageDisplay;
