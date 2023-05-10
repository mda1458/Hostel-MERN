import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // !IMPORTANT

function Mess() {
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleChange(e) {
    setLeaveDate(e.target.value);
    setReturnDate(e.target.value);
  }

  const leavingDate = {
    name: "leaving date",
    placeholder: "",
    req: true,
    type: "date",
    value: leaveDate,
    onChange: handleChange,
  };
  const returningDate = {
    name: "return date",
    placeholder: "",
    req: true,
    type: "date",
    value: returnDate,
    onChange: handleChange,
  };

  console.log(returnDate);

  const labels =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="w-full h-screen pt-20 gap-10 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Mess</h1>
      <ul className="flex gap-5 text-white text-xl">
        <li>Total Meals: 0</li>
        <li>Meals Off: 0</li>
        <li>Requests Sent: 0</li>
      </ul>
      <div className="w-full h-[30vh] flex flex-col items-center justify-center">
        <span className="text-white text-lg mb-2">This Week</span>
        <Bar
          datasetIdKey="id"
          data={{
            labels,
            datasets: [
              {
                label: "No. of Meals",
                data: [3, 2, 2, 3, 2, 3, 1],
                backgroundColor: '#1D4ED8',
                barThickness: 40,
                borderRadius: 5,
              },
            ],
          }}
        />
      </div>
      <form
        method="POST"
        action="#"
        className="bg-neutral-950 py-5 px-10 rounded-lg shadow-xl"
      >
        <div className="flex gap-5">
          <Input field={leavingDate} />
          <Input field={returningDate} />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-xl rounded-lg px-5 py-2.5 mt-5 text-center"
        >
          Request Mess off
        </button>
      </form>
    </div>
  );
}

export default Mess;
