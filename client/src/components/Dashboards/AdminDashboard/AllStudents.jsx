import { useState } from "react";
function AllStudents() {
  const [allStudents, setAllStudents] = useState([
    {
      name: "AbdulAhad Qureshi",
      cms: "368115",
      room: 321,
      hostel: "Attar-1",
    },
    {
      name: "Danish Azeem",
      cms: "370421",
      room: 327,
      hostel: "Attar-2",
    },
  ]);

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">All Students</h1>
      <div className="w-96 flex justify-center">
        <a href="../public/paging.pdf" target="_blank" download={true}
        className="px-20 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xl">
          Download List
        </a>
      </div>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-96 w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Students</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {allStudents.length === 0
            ? "No new complaints!"
            : allStudents.map((student) => (
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
                    <p className="text-lg font-bold truncate text-white">
                      {student.hostel}
                    </p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default AllStudents;
