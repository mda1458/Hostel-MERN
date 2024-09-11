import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const registerSuggestions = async (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    const response = await fetch("http://localhost:3000/api/suggestion/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({student: student._id, hostel: student.hostel, title, description: desc}),
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Suggestion registered successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    } else {
      toast.error("Suggestion registration failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    }
  };



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }

  const suggestionTitle = {
    name: "suggestion title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center max-h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-5xl mt-5">Suggestions</h1>
      <form
        method="POST"
        onSubmit={registerSuggestions}
        className="md:w-[30vw] w-full py-5 pb-7 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <Input field={suggestionTitle} />
        <div>
          <label
            htmlFor="suggestion"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your suggestion description
          </label>
          <textarea
            name="suggestion"
            placeholder="Suggestions..."
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={descChange}
            value={desc}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center"
          >
            Make Suggestion
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />
    </div>
  );
}

export default Suggestions;
