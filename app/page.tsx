"use client";

import { useState, useEffect } from "react";

let Main = () => {
  let [size, setSize] = useState(16);
  let [mp, setMp] = useState({ x: 0, y: 0 });
  let [circleSize, setCircleSize] = useState(400);

  let handleMouseMove = (e: MouseEvent) => {
    setMp({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  let map = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  let checkSize = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distance = Math.sqrt(
      Math.pow(mp.x - centerX, 2) + Math.pow(mp.y - centerY, 2)
    );
    const minSize = 0;
    const maxSize = 200;
    // Clamp distance to effectRadius
    const clampedDistance = Math.min(distance, 200);
    // Invert the mapping so size is max at center, min at edge of effectRadius
    const newSize = map(clampedDistance, 0, 200, maxSize, minSize);
    setSize(newSize);
  };

  useEffect(() => {
    checkSize();
  }, [mp]);

  console.log(mp);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="bg-[#66ff00] rounded-full"
        style={{
          width: size + "px",
          height: size + "px",
          position: "absolute",
          left: mp.x - size / 2 + "px",
          top: mp.y - size / 2 + "px",
          filter: `blur(${map(size, 0, 200, 20, 0)}px)`,
          zIndex: 10,
        }}
      ></div>
      <div
        className="absolute bg-[#207936] rounded-full shadow-[inset_0px_0px_20px_16px_#9AFF7E] z-0 overflow-hidden"
        style={{
          width: circleSize + "px",
          height: circleSize + "px",
        }}
      >
        <div className="grid-bg box"></div>
      </div>
    </div>
  );
};

export default Main;
