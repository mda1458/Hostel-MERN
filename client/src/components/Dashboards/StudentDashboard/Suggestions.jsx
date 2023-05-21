import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";

function Suggestions() {

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
        action="#"
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
    </div>
  );
}

export default Suggestions;
