import {useEffect} from 'react'

function Home() {
  let admin = localStorage.getItem("admin");
  admin = JSON.parse(admin);
  console.log(admin);

  useEffect(() => {
  const getHostel = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/get-hostel", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({id : admin._id})
      });

      const data = await res.json();
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (err) {
      console.log(err);
    }
  }
  
    getHostel();
  }, [admin._id]);

  let hostel = localStorage.getItem("hostel");
  hostel = JSON.parse(hostel);
  console.log(hostel.name, admin.name);

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