"use client";
import { FC, useEffect, useState } from "react";

interface TruncateTextProps {
  children: string;
  wordLimit: number;
}

const TruncateText: FC<TruncateTextProps> = ({ children, wordLimit }) => {
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
