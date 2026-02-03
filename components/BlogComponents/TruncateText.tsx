"use client";
import { useEffect, useState } from "react";

interface TruncateTextProps {
  children: string | React.ReactNode; // allow string or any JSX content
  wordLimit: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ children, wordLimit }) => {
  const [truncatedText, setTruncatedText] = useState("");

  useEffect(() => {
    if (typeof children === "string") {
      const wordsArray = children.split(/\s+/);
      if (wordsArray.length > wordLimit) {
        setTruncatedText(wordsArray.slice(0, wordLimit).join(" ") + "...");
      } else {
        setTruncatedText(children);
      }
    } else {
      // if children is not a string, render nothing
      setTruncatedText("");
    }
  }, [children, wordLimit]);

  return <>{truncatedText}</>;
};

export default TruncateText;
