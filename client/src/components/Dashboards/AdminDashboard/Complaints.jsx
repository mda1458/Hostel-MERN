import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function Complaints() {
  //!AFTER FETCH FILL THIS WITH COMPLAINT DATA
  const [unsolvedComplaints, setComplaints] = useState([
    {
      hostel: "Attar-1",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "AbdulAhad",
      status: "Pending",
      date: "15-5-2023",
    },
    {
      hostel: "Attar-2",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "Danish",
      status: "Pending",
      date: "14-5-2023",
    },
    {
      hostel: "Attar-2",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "Saim",
      status: "Pending",
      date: "13-5-2023",
    },
    {
      hostel: "Attar-2",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "Nagra",
      status: "Pending",
      date: "15-5-2023",
    },
  ]);

  const [resolvedComplaints, setResolvedComplaints] = useState([]); //!DO NOT FILL THIS WITH DATA FROM FETCH
  const [allComplaints, setAllComplaints] = useState([
    {
      hostel: "Attar-1",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "AbdulAhad",
      status: "Pending",
      date: "May 15, 2023",
    },
    {
      hostel: "Attar-2",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "Danish",
      status: "Pending",
      date: "May 14, 2023",
    },
    {
      hostel: "Attar-2",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "Saim",
      status: "Pending",
      date: "May 13, 2023",
    },
    {
      hostel: "Attar-2",
      title: "Title goes here.",
      desc: "Description of the complaint",
      student: "Nagra",
      status: "Pending",
      date: "May 15, 2023",
    },
  ]); //!AFTER FETCH FILL THIS WITH COMPLAINT DATA

  const dismissComplaint = () => {
    unsolvedComplaints.find(
      (complaint) => complaint.status.toLowerCase() === "pending"
    ).status = "Solved";
    setComplaints(
      unsolvedComplaints.filter(
        (complaint) => complaint.status.toLowerCase() === "pending"
      )
    );
    setResolvedComplaints((resolvedComplaints) =>
      resolvedComplaints.concat(
        unsolvedComplaints.filter(
          (complaint) => complaint.status.toLowerCase() !== "pending"
        )
      )
    );
  };

  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const dates = [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    ];

    const labels = dates.map((date) => date);
    setGraphData(
      labels.map(
        (date) =>
          allComplaints.filter((complaint) => complaint.date === date).length
      )
    );
  }, [allComplaints]);

  const graph = (
    <div className="flex items-center justify-center md:h-64 h-40 md:w-96 w-full">
      <Line
        data={{
          labels: [
            new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          ],
          datasets: [
            {
              label: "No. of Complaints",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
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
        <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-96 max-h-64 overflow-auto">
          <span className="text-white font-bold text-xl">New Complaints</span>
          <ul role="list" className="divide-y divide-gray-700 text-white ">
            {unsolvedComplaints.length === 0
              ? "No new complaints!"
              : unsolvedComplaints.map((complaint) => (
                <li className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all" key={complaint.student}>
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
