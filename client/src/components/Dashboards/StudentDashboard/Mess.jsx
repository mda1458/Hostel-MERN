import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // !IMPORTANT

function Mess() {
  let requestMessOff = async (event) => {
    event.preventDefault();
    let data = {
      student: JSON.parse(localStorage.getItem("student"))._id,
      leaving_date: leaveDate,
      return_date: returnDate,
    };

    let response = await fetch("http://localhost:3000/api/messoff/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();

    if (result.success) {
      setRequests(requests + 1);
      setLeaveDate("");
      setReturnDate("");
      alert("Mess off requested successfully");
    } else {
      alert(result.errors[0].msg);
    }
  };

  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [requests, setRequests] = useState(0);

  function handleleaveChange(e) {
    setLeaveDate(e.target.value);
  }
  function handlereturnChange(e) {
    setReturnDate(e.target.value);
  }

  const leavingDate = {
    name: "leaving date",
    placeholder: "",
    req: true,
    type: "date",
    value: leaveDate,
    onChange: handleleaveChange,
  };
  const returningDate = {
    name: "return date",
    placeholder: "",
    req: true,
    type: "date",
    value: returnDate,
    onChange: handlereturnChange,
  };

  // console.log(returnDate);

  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("student"));
    if (student) {
      fetch("http://localhost:3000/api/messoff/count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: student._id,
        }),
      })
        .then((res) => {
          res.json()
        })
        .then((result) => {
          if (result.success) {
            setRequests(result.count);
          } else {
            alert(result.errors[0].msg);
          }
        });
    }
  }, [requests]);

            

  const date = new Date();
  const labels =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="w-full h-screen pt-20 gap-10 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Mess</h1>
      <ul className="flex gap-5 text-white text-xl">
        <li>Total Meals: {0 || date.getDate() * 3}</li>
        <li>Meals Off: 0</li>
        <li>Requests Sent: {requests}</li>
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
        onSubmit={requestMessOff}
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
