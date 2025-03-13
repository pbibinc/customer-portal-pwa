import React from "react";

export const BlueBackground: React.FC = () => {
  return (
    <img
      src={require("../assets/bg-dashboard.png")}
      alt="SignIn"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        zIndex: -1,
      }}
    />
  );
};
