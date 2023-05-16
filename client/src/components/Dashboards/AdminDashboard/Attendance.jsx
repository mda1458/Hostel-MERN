import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

function Attendance() {
  const [unmarkedStudents, setunmarkedStudents] = useState([
    {
      cms: 368115,
      name: "Abdul Ahad",
      room: 69,
      attendance: undefined,
    },
    {
      cms: 368116,
      name: "Danish",
      room: 69,
      attendance: undefined,
    },
  ]);

  const [markedStudents, setMarkedStudents] = useState([]);

  const markAttendance = (studentCms, isPresent) => {
    unmarkedStudents.find((student) => student.cms === studentCms).attendance =
      isPresent;
    setunmarkedStudents(
      unmarkedStudents.filter((student) => student.attendance === undefined)
    );
    setMarkedStudents((markedStudents) =>
      markedStudents.concat(
        unmarkedStudents.filter((student) => student.attendance !== undefined)
      )
    );
  };

  const [present, setPresent] = useState(0);

  useEffect(() => {
    console.log("State: ", unmarkedStudents);
    console.log("Marked: ", markedStudents);
    setPresent(
      markedStudents.filter((student) => student.attendance === true).length
    );
  }, [unmarkedStudents, markedStudents]);

  let date = new Date();
  date = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const labels = ["Present", "Absentees", "Unmarked Students"];
  const graph = (
    <div className="flex flex-row-reverse items-center gap-3 h-64">
      <Doughnut
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              label: "No. of Students",
              data: [
                present,
                markedStudents.length - present,
                unmarkedStudents.length,
              ],
              backgroundColor: ["#1D4ED8", "#F26916", "#808080"],
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
          <span className="w-10 h-5 bg-orange-500 block"></span> Absent
        </li>
        <li className="flex gap-2">
          {" "}
          <span className="w-10 h-5 bg-blue-500 block"></span> Present
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Attendance</h1>
      <p className="text-white text-xl mb-10">Date: {date}</p>
      <div className="flex gap-5 flex-wrap">
        <>{graph}</>
        <div className="flow-root w-96 bg-neutral-950 px-7 py-5 rounded-lg shadow-xl max-h-[250px] overflow-auto">
          <span
            className={`font-bold text-xl text-white ${
              unmarkedStudents.length ? "block" : "hidden"
            }`}
          >
            Unmarked Students
          </span>
          <ul role="list" className="divide-y divide-gray-700 text-white">
            {unmarkedStudents.length === 0
              ? "All students are marked!"
              : unmarkedStudents.map((student) =>
                  student.attendance === undefined ? (
                    <li
                      className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all"
                      key={student.cms}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">
                            {student.name}
                          </p>
                          <p className="text-sm truncate text-gray-400">
                            {student.cms} | Room: {student.room}
                          </p>
                        </div>
                        <button
                          className="hover:underline hover:text-green-600 hover:scale-125 transition-all"
                          onClick={() => markAttendance(student.cms, true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                        <button
                          className="hover:underline hover:text-red-600 hover:scale-125 transition-all"
                          onClick={() => markAttendance(student.cms, false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ) : (
                    ""
                  )
                )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
