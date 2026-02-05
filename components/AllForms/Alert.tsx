"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message?: string;
}

const alertStyles: Record<
  AlertProps["type"],
  { bg: string; text: string; icon: string }
> = {
  success: {
    bg: "bg-green-50 border-green-300",
    text: "text-green-700",
    icon: "mdi:check-circle",
  },
  error: {
    bg: "bg-red-50 border-red-300",
    text: "text-red-700",
    icon: "mdi:alert-circle",
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-300",
    text: "text-yellow-700",
    icon: "mdi:alert",
  },
  info: {
    bg: "bg-blue-50 border-blue-300",
    text: "text-blue-700",
    icon: "mdi:information",
  },
};

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  if (!message) return null;

  const styles = alertStyles[type];

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${styles.bg}`}
      role="alert"
    >
      <Icon
        icon={styles.icon}
        className={`${styles.text}`}
        width="1.25rem"
        height="1.25rem"
      />
      <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
    </div>
  );
};

export default Alert;
