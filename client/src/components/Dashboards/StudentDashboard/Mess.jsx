import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // !IMPORTANT
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mess() {
  let requestMessOff = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = {
      student: JSON.parse(localStorage.getItem("student"))._id,
      leaving_date: leaveDate,
      return_date: returnDate,
    };

    let response = await fetch("http://localhost:3000/api/Messoff/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    if (result.success) {
      setRequests(requests+1);
      setLeaveDate("");
      setReturnDate("");
      toast.success('Mess Off Requested Succesfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setLoading(false);
  };

  let daysofmonthtilltoday = new Date().getDate();

  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [requests, setRequests] = useState(0);
  const [Messoff, setMessOff] = useState(0);
  const [loading, setLoading] = useState(false);
  const [requestsList, setRequestsList] = useState([]);

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
    setLoading(true);
    if (student) {
      fetch("http://localhost:3000/api/Messoff/count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: student._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setMessOff(result.approved);
            setRequests(result.list.length);
            setRequestsList(result.list);
          } else {
            alert(result.errors[0].msg);
          }
        });
    }
    setLoading(false);
  }, [requests]);

  const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
  const loader = (
    <svg
      aria-hidden="true"
      className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  return (
    
    <div className="w-full h-screen gap-10 flex flex-col items-center justify-center max-h-screen overflow-y-auto pt-[500px] sm:pt-96 md:pt-96 lg:pt-40">
      <h1 className="text-white font-bold text-5xl">Mess Off</h1>
      <ul className="flex gap-5 text-white text-xl px-5 sm:p-0 text-center">
        <li>Total Mess: {daysofmonthtilltoday - Messoff} </li>
        <li>Mess Off: {loading ? loader : Messoff}</li>
        <li>Requests Sent: {loading ? loader : requests}</li>
      </ul>
      <div className="w-full gap-10 flex items-center justify-center flex-wrap">
        <div className="h-[30vh] gap-2 flex items-center justify-center flex-wrap">
          <Doughnut
            datasetIdKey="id"
            data={{
              labels,
              datasets: [
                {
                  label: "Mess",
                  data: [Messoff, requests, daysofmonthtilltoday-Messoff],
                  backgroundColor: ["#F26916", "#EAB308", "#1D4ED8"],
                  barThickness: 20,
                  borderRadius: 0,
                  borderJoinStyle: "round",
                  borderColor: "rgba(0,0,0,0)",
                  hoverOffset: 10,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
          <ul className="text-white">
            <li className="flex gap-2">
              {" "}
              <span className="w-10 h-5 bg-orange-500 block"></span> Mess Off
            </li>
            <li className="flex gap-2">
              {" "}
              <span className="w-10 h-5 bg-yellow-500 block"></span> Requested
              Mess
            </li>
            <li className="flex gap-2">
              {" "}
              <span className="w-10 h-5 bg-blue-500 block"></span> Mess
              Attended
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-80 max-w-md max-h-60 p-4 border rounded-lg shadow sm:p-8 bg-neutral-950 border-neutral-900 drop-shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-white">
              All Requests
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-700 text-white ">
              {requestsList.length === 0
                ? "No requests Sent"
                : requestsList.map((req) => (
                    <li className="py-3 sm:py-4" key={req._id}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">
                            {req.status.toUpperCase()}
                          </p>
                          <p className="text-sm truncate text-gray-400">
                          {new Date(req.leaving_date).toDateString().slice(4, 10)} to {new Date(req.return_date).toDateString().slice(4, 10)}
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-base font-semibold text-white">
                        {new Date(req.request_date).toDateString().slice(4,10)}
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      <form
        method="POST"
        onSubmit={requestMessOff}
        className="bg-neutral-950 py-5 px-10 rounded-lg shadow-xl w-full sm:w-auto"
      >
        <div className="flex gap-5">
          <Input field={leavingDate} />
          <Input field={returningDate} />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-xl rounded-lg px-5 py-2.5 mt-5 text-center"
        >
          {loading ? (
            <div>{loader} Sending Request...</div>
          ) : (
            "Request Mess off"
          )}
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </form>
    </div>
  );
}

export default Mess;
