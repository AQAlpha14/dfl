"use client";
import React, { useEffect, useState } from "react";

const TruncateText = ({ children, wordLimit }) => {
  const [truncatedText, setTruncatedText] = useState("");

  useEffect(() => {
    if (children && typeof children === "string") {
      const wordsArray = children.split(/\s+/);
      if (wordsArray.length > wordLimit) {
        setTruncatedText(wordsArray.slice(0, wordLimit).join(" ") + "...");
      } else {
        setTruncatedText(children);
      }
    } else {
      setTruncatedText("");
    }
  }, [children, wordLimit]);

  return <>{truncatedText}</>;
};

export default TruncateText;
