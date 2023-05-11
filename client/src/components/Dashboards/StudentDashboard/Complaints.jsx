import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
function Complaints() {
  const registerComplaint = async (e) => {
    e.preventDefault();
    let student = JSON.parse(localStorage.getItem("student"));
    const complaint = {
      student: student._id,
      hostel: student.hostel,
      title: title,
      description: desc,
      type: type,
    };

    const res = await fetch("http://localhost:3000/api/complaint/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    });

    const data = await res.json();

    if (data.success) {
      alert("Complaint registered successfully");
      setTitle("");
      setDesc("");
      setType("Electric");
    } else {
      alert(data.message);
    }
  };
    
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Electric");

  const types = ["Electric", "Furniture", "Cleaning", "Others"];

  function chngType(e) {
    setType(e.target.value);
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }

  const complaintTitle = {
    name: "complaint title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };
  const complaintType = {
    name: "complaint type",
    placeholder: "Type...",
    req: true,
    type: "text",
    value: type,
    onChange: chngType,
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center md:p-0 px-10">
      <h1 className="text-white font-bold text-5xl mt-10">Complaints</h1>
      <form
        method="POST"
        onSubmit={registerComplaint}
        className="md:w-[30vw] w-full py-5 pb-7 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your complaint type
          </label>
          <select
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={chngType}
          >
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {
            type.toLowerCase() === 'electric' || type.toLowerCase() === 'furniture' || type.toLowerCase() === 'cleaning' ?  
            <></> : (
              <div className="mt-5">
                <Input field={complaintType} />
              </div>
              )
          }
        </div>
        <Input field={complaintTitle} />
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your complaint description
          </label>
          <textarea
            name="description"
            placeholder="Details of complaint"
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={descChange}
            value={desc}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center"
          >
            Register Complaint
          </button>
        </div>
      </form>
    </div>
  );
}

export default Complaints;
