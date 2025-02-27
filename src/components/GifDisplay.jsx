import React from "react";
import { motion } from "framer-motion";

const GifDisplay = ({ gif }) => {
  return gif ? (
    <motion.img
      src={gif}
      alt="GIF"
      animate={{ scale: [0.5, 1] }}
      transition={{ duration: 0.5 }}
      style={{ width: "250px", marginTop: "20px", borderRadius: "10px" }}
    />
  ) : null;
};

export default GifDisplay;
