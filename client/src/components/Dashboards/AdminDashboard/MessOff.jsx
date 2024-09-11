import { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  LoadingBar  from 'react-top-loading-bar'

function MessOff() {
  const getRequests = async () => {
    setProgress(30);
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("http://localhost:3000/api/messoff/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    setProgress(40);
    const data = await res.json();
    setProgress(60)
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        req.student.name = req.student.name;
        req.student.room_no = req.student.room_no;
        req.status = req.status;
        setProgress(progress+10)
      });
      setProgress(80);
      setNewReqs(data.list);
      setApprovedReqs(data.approved);
      setRejectedReqs(data.rejected);
      graphData.current = [
        approvedReqs,
        rejectedReqs,
        newReqs.length,
      ];
    }
    setProgress(100);
  };

  const updateRequest = async (id, status) => {
    const res = await fetch("http://localhost:3000/api/messoff/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.success) {
      let student = newReqs.find((req) => req.id === id).student;
      toast.success(
        `Request from ${student.name} has been ${status}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        }
      );
    }
    else{
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      })
    }
  };

  const [progress, setProgress] = useState(0);
  const [newReqs, setNewReqs] = useState([]);
  const [approvedReqs, setApprovedReqs] = useState(0);
  const [rejectedReqs, setRejectedReqs] = useState(0);
  const graphData = useRef([
      approvedReqs,
      rejectedReqs,
      newReqs.length,
  ]);

  const approve = (id) => {
    setNewReqs((newReqs) => newReqs.filter((req) => req.id !== id));
    updateRequest(id, "approved");
};

const reject = (id) => {
    setNewReqs((newReqs) => newReqs.filter((req) => req.id !== id));
    updateRequest(id, "rejected");
  };

  const graph = (
    <Bar
      data={{
        labels: ["accepted", "rejected", "unmarked"],
        datasets: [
          {
            label: 'Requests',
            data: graphData.current,
            backgroundColor: "blue",
            borderRadius: 5,
            borderWidth: 1,
            barThickness: 60,
          },
        ],
      }}
    />
  );

  useEffect(() => {
    getRequests();
  }, [newReqs.length, approvedReqs, rejectedReqs]);
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <LoadingBar color="#0000FF" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl">Manage Mess</h1>
      <div className="w-96 h-52">{graph}</div>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[450px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Requests</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {newReqs.length === 0 ? (
            <li className="mt-2">No new requests</li>
          ) : (
            newReqs.map((req) => (
              <li
                className="group py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                key={req.id}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 group-hover:scale-105 group-hover:text-yellow-500 transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {req.student.name} [Room: {req.student.room_no}]
                    </p>
                    <p className="text-sm truncate text-gray-400">
                      from: {req.from} to: {req.to}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="group/show relative z-0"
                      onClick={() => approve(req.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:text-green-600 hover:scale-125
                      transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">
                        Approve.
                      </span>
                    </button>
                    <button
                      className="group/show relative z-0"
                      onClick={() => reject(req.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:text-red-500 hover:scale-125
                      transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">
                        Reject.
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </div>
  );
}

export default MessOff;
