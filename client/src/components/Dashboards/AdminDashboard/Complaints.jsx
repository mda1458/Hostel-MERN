import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

function Complaints() {
  const allComplaints = useRef([{}]);
  const unsolvedComplaints = useRef([{}]);
  const resolvedComplaints = useRef([{}]);

  const getComplaints = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const response = await fetch(`http://localhost:3000/api/complaint/hostel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel }),
    });

    const data = await response.json();
    if (data.success) {
      const complaints = [];
      data.complaints.map((complaint) => {
        let date = new Date(complaint.date);
        complaints.unshift({
          id: complaint._id,
          type: complaint.type,
          title: complaint.title,
          desc: complaint.description,
          student: complaint.student.name,
          room: complaint.student.room_no,
          status: complaint.status,
          date: date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        });
      });
      allComplaints.current = complaints;
      const resolved = resolvedComplaints.current.filter(
        (complaint) => complaint.status !== "pending"
      );
      resolvedComplaints.current = resolved;
      unsolvedComplaints.current = complaints.filter(
        (complaint) => complaint.status === "pending"
      );
    } else console.log(data.message);
  };

  const dismissComplaint = (id) => {
    fetch(`http://localhost:3000/api/complaint/resolve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getComplaints();
        } else {
          console.log(data);
        }
      });
  };

  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getComplaints();
    const dates = [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
    ];

    const labels = dates.map((date) => date);
    setGraphData(
      labels.map(
        (date) =>
          allComplaints.current.filter((complaint) => complaint.date === date)
            .length
      )
    );
  }, [allComplaints, unsolvedComplaints, resolvedComplaints]);

  const graph = (
    <div className="flex items-center justify-center md:h-64 h-40 md:w-96 w-full">
      <Line
        data={{
          labels: [
            new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
            new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            ),
          ],
          datasets: [
            {
              label: "No. of Complaints",
              pointHoverBackgroundColor: "orange",
              data: graphData,
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
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-10 md:gap-7 pt-32 items-center justify-center overflow-auto">
      <h1 className="text-white font-bold text-5xl">Complaints</h1>
      <div className="flex md:gap-7 flex-wrap justify-center items-center gap-7">
        {graph}
        <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-full mx-5 sm:m-0 sm:w-96 max-h-64 overflow-auto">
          <span className="text-white font-bold text-xl">New Complaints</span>
          <ul role="list" className="divide-y divide-gray-700 text-white">
            {unsolvedComplaints.current.length === 0
              ? "No new complaints!"
              : unsolvedComplaints.current.map((complaint) => (
                  <li
                    className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all"
                    key={complaint.student}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-white">
                          {complaint.title}
                        </p>
                        <p className="text-sm truncate text-gray-400">
                          {complaint.desc}
                        </p>
                      </div>
                      <button
                        className="hover:underline hover:text-green-600"
                        onClick={() => dismissComplaint()}
                      >
                        Solved
                      </button>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
