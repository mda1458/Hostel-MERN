import {useEffect} from 'react'

function Home() {
  let admin = localStorage.getItem("admin");
  admin = JSON.parse(admin);
  let hostel = localStorage.getItem("hostel");
  hostel = JSON.parse(hostel);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">
        Welcome <span className="text-blue-500">{admin.name}!</span>
      </h1>
      <h1 className="text-white font-bold text-5xl">
        You are Managing <span className="text-blue-500">{hostel.name}!</span>
      </h1>
    </div>
  );
}

export default Home;