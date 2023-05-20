import { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";

function MessOff() {
  const [newReqs, setNewReqs] = useState([
    {
      from: "29-5-2023",
      to: "31-5-2023",
      student: {
        id: 10,
        name: "Abdul Ahad",
        room_no: 29,
      },
      status: "pending",
    },
    {
      from: "29-5-2023",
      to: "31-5-2023",
      status: "pending",
      student: {
        id: 12,
        name: "Danish Azeem",
        room_no: 31,
      },
    },
  ]);
  const [approvedReqs, setApprovedReqs] = useState([]);
  const [rejectedReqs, setRejectedReqs] = useState([]);
  const graphData = useRef([
      approvedReqs.length,
      rejectedReqs.length,
      newReqs.length,
  ]);

  const approve = (id) => {
    const student = newReqs.find((req) => req.student.id === id);
    student.status = "approved";
    setNewReqs((newReqs) => newReqs.filter((req) => req.student.id !== id));
    setApprovedReqs(newReqs.filter((req) => req.student === student));
    graphData.current[0] += 1;
};

const reject = (id) => {
    const student = newReqs.find((req) => req.student.id === id);
    student.status = "rejected";
    setNewReqs((newReqs) => newReqs.filter((req) => req.student.id !== id));
    setRejectedReqs(newReqs.filter((req) => req.student === student));
    graphData.current[1] += 1;
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

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
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
                key={req.student._id}
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
                      onClick={() => approve(req.student.id)}
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
                      onClick={() => reject(req.student.id)}
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
      </div>
    </div>
  );
}

export default MessOff;
