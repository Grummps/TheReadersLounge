import React from "react";

const SideFadeBars = () => {
  return (
    <>
      {/* Left Bar */}
      <div className="pointer-events-none fixed top-0 left-0 h-full w-[30vw] bg-gradient-to-r from-black to-transparent z-10" />

      {/* Right Bar */}
      <div className="pointer-events-none fixed top-0 right-0 h-full w-[30vw] bg-gradient-to-l from-black to-transparent z-10" />
    </>
  );
};

export default SideFadeBars;

