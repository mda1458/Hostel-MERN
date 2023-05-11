import React from "react";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-white font-bold text-5xl">
        Welcome <span className="text-blue-500">{"admin.name"}!</span>
      </h1>
    </div>
  );
}
