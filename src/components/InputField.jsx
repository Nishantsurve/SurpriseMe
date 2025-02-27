import React from "react";

const InputField = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Enter your name"
      value={value}
      onChange={onChange}
      style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", marginBottom: "15px" }}
    />
  );
};

export default InputField;
