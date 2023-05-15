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
    unmarkedStudents.find((student) => student.cms === studentCms).attendance = isPresent;
    setunmarkedStudents(unmarkedStudents.filter((student) => student.attendance === undefined));
    setMarkedStudents((markedStudents) => markedStudents.concat(unmarkedStudents.filter((student) => student.attendance !== undefined)));
  };

  useEffect(()=> {
    console.log( "State: ", unmarkedStudents);
    console.log( "Marked: ", markedStudents);
  },[unmarkedStudents, markedStudents])

  let date = new Date();
  date = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  const labels = ['Present', 'Absentees']
  const graph = (
    <div className="flex flex-row-reverse items-center gap-3 h-64">
      <Doughnut
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              label: "No. of Students",
              data: [2, 3],
              backgroundColor: ["#F26916", "#1D4ED8"],
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
        <>
            {graph}
        </>
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
                    <li className="py-3 sm:py-4" key={student.cms}>
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
                            {student.name}
                          </p>
                          <p className="text-sm truncate text-gray-400">
                            {student.cms} | Room: {student.room}
                          </p>
                        </div>
                        <button
                          className="hover:underline"
                          onClick={() => markAttendance(student.cms, true)}
                        >
                          Present
                        </button>
                        <button
                          className="hover:underline"
                          onClick={() => markAttendance(student.cms, false)}
                        >
                          Absent
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
