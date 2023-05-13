import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

function Attendance() {
  const getAttendance = async () => {
      let student = JSON.parse(localStorage.getItem("student"));
      const res = await fetch("http://localhost:3000/api/attendance/get", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({student:student._id}),
      });
      const data = await res.json();
      if(data.success){
        let daysOff = 0;
        let thisWeek = [];
        data.attendance.map((day) => {
          if(day.status === "absent"){
            daysOff++;
          }
          if (new Date(day.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
            thisWeek.push(
              { weekdate: new Date(day.date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'}), weekday: new Date(day.date).toLocaleDateString('en-PK', {weekday:"long"}), present: day.status === "Present" }
            );
          }
        });
        setDaysOff(daysOff);
        setThisWeek(thisWeek);
        console.log(daysOff, thisWeek);
      }
      else{
        console.log("Error");
      }
    };
  const [daysOff, setDaysOff] = useState(0); //!Fetch from database
  const [thisWeek, setThisWeek] = useState([{}]); //!Fetch from database

  let totalDays = new Date();
  totalDays = totalDays.getDate();
  const labels = ["Days off", "Days present"];

  useEffect(() => {
    getAttendance();
  }, [ daysOff, thisWeek ]);
  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Attendance</h1>
      <ul className="flex gap-5 text-white text-xl">
        <li>Total Days: {totalDays}</li>
        <li>Present Days: {totalDays - daysOff}</li>
        <li>Absent days: {daysOff}</li>
      </ul>
      <div className="flex gap-5 flex-wrap max-h-96">
        <Doughnut
          datasetIdKey="id"
          data={{
            labels,
            datasets: [
              {
                label: "days",
                data: [daysOff, totalDays - daysOff],
                backgroundColor: ["#F26916", "#1D4ED8"],
                barThickness: 40,
                borderRadius: 5,
                borderColor: "rgba(0,0,0,0)",
                hoverOffset: 10,
              },
            ],
          }}
        />
        <div className="flow-root bg-neutral-950 rounded-lg shadow-xl w-80 p-5">
          <p className="text-white text-xl font-bold ">This Week</p>
          <ul role="list" className="divide-y divide-gray-700">
            {thisWeek.map((day) => (
              <li className="py-3 sm:py-4" key={day.weekdate}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {day.weekday} -- {day.weekdate}
                    </p>
                    <p className="text-sm truncate text-gray-400">{day.present?"Present":"Absent"}</p>
                  </div>
                  <div className="flex flex-col items-center text-base font-semibold text-white">
                    {day.present ? (
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
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
