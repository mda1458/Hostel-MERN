import React from "react";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));


  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">
        Welcome <span className="text-blue-500">{admin.name||"admin"}!</span>
      </h1>
      <h1 className="text-white font-bold text-5xl">
        You are Managing <span className="text-blue-500">{hostel.name||"hostel"}!</span>
      </h1>
    </div>
  );
}

export default Home;