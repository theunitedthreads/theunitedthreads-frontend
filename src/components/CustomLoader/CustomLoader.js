import React from "react";
import "./CustomLoader.css";

export default function CustomLoader({ color = "#ffffff" }) {
  const styles = {
    customLoaderContainer: {
      "--uib-size": "23px",
      "--uib-color": color,
      "--uib-speed": "1.4s",
      "--dot-size": "calc(var(--uib-size) * 0.17)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "var(--uib-size)",
      width: "var(--uib-size)",
      animation: `smoothRotate calc(var(--uib-speed) * 1.8) linear infinite`,
    },
    dot: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      animation: `rotate var(--uib-speed) ease-in-out infinite`,
    },
    dotBefore: {
      content: '""',
      height: "var(--dot-size)",
      width: "var(--dot-size)",
      borderRadius: "50%",
      backgroundColor: "var(--uib-color)",
      transition: "background-color 0.3s ease",
    },
    dotDelay2: {
      animationDelay: "calc(var(--uib-speed) * -0.835 * 0.5)",
    },
    dotDelay3: {
      animationDelay: "calc(var(--uib-speed) * -0.668 * 0.5)",
    },
    dotDelay4: {
      animationDelay: "calc(var(--uib-speed) * -0.501 * 0.5)",
    },
    dotDelay5: {
      animationDelay: "calc(var(--uib-speed) * -0.334 * 0.5)",
    },
    dotDelay6: {
      animationDelay: "calc(var(--uib-speed) * -0.167 * 0.5)",
    },
  };

  return (
    <div style={styles.customLoaderContainer}>
      <div style={{ ...styles.dot, ...styles.dotDelay2 }}>
        <span style={styles.dotBefore}></span>
      </div>
      <div style={{ ...styles.dot, ...styles.dotDelay3 }}>
        <span style={styles.dotBefore}></span>
      </div>
      <div style={{ ...styles.dot, ...styles.dotDelay4 }}>
        <span style={styles.dotBefore}></span>
      </div>
      <div style={{ ...styles.dot, ...styles.dotDelay5 }}>
        <span style={styles.dotBefore}></span>
      </div>
      <div style={{ ...styles.dot, ...styles.dotDelay6 }}>
        <span style={styles.dotBefore}></span>
      </div>
    </div>
  );
}
