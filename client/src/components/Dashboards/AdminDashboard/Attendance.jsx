import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

function Attendance() {
  const getALL = async () => {
    setProgress(30);
    const marked = await fetch("http://localhost:3000/api/attendance/getHostelAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: JSON.parse(localStorage.getItem("hostel"))._id }),
        });
    setProgress(40);
    const markedData = await marked.json();
    setProgress(50)
    if (markedData.success) {
      // console.log("Attendance: ", markedData.attendance);
    }
    const markedStudents = markedData.attendance.map((student) => {
      return {
        id: student.student._id,
        cms: student.student.cms_id,
        name: student.student.name,
        room: student.student.room_no,
        attendance: student.status === "present" ? true : false,
      };
    });
    setProgress(70);
    setMarkedStudents(markedStudents);
    const data = await getAllStudents();
    const students = data.students;
    const unmarkedStudents = students.filter(
      (student) =>
        !markedStudents.find((markedStudent) => markedStudent.id === student._id)
    );
    setProgress(90);
    unmarkedStudents.map((student) => {
      student.id = student._id;
      student.cms = student.cms_id;
      student.name = student.name;
      student.room = student.room_no;
      student.attendance = undefined;
    });
    setunmarkedStudents(unmarkedStudents);
    setProgress(100);
  };

  const [progress, setProgress] = useState(0)
  const [unmarkedStudents, setunmarkedStudents] = useState([]);
  const [markedStudents, setMarkedStudents] = useState([]);

  const markAttendance = async (id, isPresent) => {
    const data = await fetch(`http://localhost:3000/api/attendance/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student:id, status: isPresent? "present" : "absent" }),
    });
    const response = await data.json();
    if (response.success) {
      toast.success(
        "Attendance Marked Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    unmarkedStudents.find((student) => student.id === id).attendance =
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
    getALL();
    setPresent(
      markedStudents.filter((student) => student.attendance === true).length
    );
  }, [unmarkedStudents.length, markedStudents.length]);

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
    <div className="w-full h-screen flex flex-col gap-3 items-center xl:pt-0 md:pt-40 pt-64 justify-center overflow-auto max-h-screen">
      <LoadingBar color="#0000FF" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl">Attendance</h1>
      <p className="text-white text-xl mb-10">Date: {date}</p>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        <>{graph}</>
        <div className="flow-root md:w-[400px] w-full bg-neutral-950 px-7 py-5 rounded-lg shadow-xl max-h-[250px] overflow-auto">
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
                      key={student.id}
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
                          onClick={() => markAttendance(student.id, true)}
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
                          onClick={() => markAttendance(student.id, false)}
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme= "dark"
      />
    </div>
  );
}

export default Attendance;
