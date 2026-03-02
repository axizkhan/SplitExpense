import React from "react";

const WalletLogo = ({ size = 200 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Background Gradient */}
        <linearGradient
          id="bgGradient"
          x1="0"
          y1="0"
          x2="1"
          y2="1">
          <stop
            offset="0%"
            stopColor="#cfe9e6"
          />
          <stop
            offset="100%"
            stopColor="#a8d5cf"
          />
        </linearGradient>

        {/* Inner Gradient */}
        <linearGradient
          id="innerGradient"
          x1="0"
          y1="0"
          x2="1"
          y2="1">
          <stop
            offset="0%"
            stopColor="#1dd1b9"
          />
          <stop
            offset="100%"
            stopColor="#10ac84"
          />
        </linearGradient>

        {/* Soft Shadow */}
        <filter
          id="shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="#0f3f3a"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      {/* Outer Rounded Square */}
      <rect
        x="56"
        y="56"
        width="400"
        height="400"
        rx="90"
        fill="url(#bgGradient)"
        stroke="#0f5c59"
        strokeWidth="16"
        filter="url(#shadow)"
      />

      {/* Inner Wallet Shape */}
      <rect
        x="140"
        y="160"
        width="260"
        height="200"
        rx="50"
        fill="url(#innerGradient)"
        stroke="#0f5c59"
        strokeWidth="14"
      />

      {/* Wallet Inner Panel */}
      <rect
        x="170"
        y="190"
        width="200"
        height="140"
        rx="30"
        fill="#cfe9e6"
        stroke="#0f5c59"
        strokeWidth="10"
      />

      {/* Card Slot */}
      <rect
        x="300"
        y="210"
        width="120"
        height="100"
        rx="25"
        fill="#cfe9e6"
        stroke="#0f5c59"
        strokeWidth="10"
      />

      {/* Small Square Detail */}
      <rect
        x="345"
        y="245"
        width="30"
        height="30"
        rx="6"
        fill="#0f5c59"
      />
    </svg>
  );
};

export default WalletLogo;
