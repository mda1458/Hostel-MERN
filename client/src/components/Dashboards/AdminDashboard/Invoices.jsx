import { useState } from "react";

function Invoices() {
  const [allInvoices, setAllInvoices] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([
    {
      amount: 400,
      student: {
        name: "AbdulAhad",
        room_no: 29,
      },
    },
    {
      amount: 400,
      student: {
        name: "AbdulAhad",
        room_no: 29,
      },
    },
  ]);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Invoices</h1>
      <button className="py-3 px-7 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-800 transition-all">
        Generate Invoices
      </button>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Invoices</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {pendingInvoices.length === 0
            ? "No Students Found"
            : pendingInvoices.map((invoice) => (
                <li
                  className="py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:scale-105 transition-all"
                  key={invoice.student}
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
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        {invoice.student.name}
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        Room: {invoice.student.room_no} | Amount: Rs.{" "}
                        {invoice.amount}
                      </p>
                    </div>
                    <button className="group/show relative z-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 group-hover/show:scale-125 group-hover/show:text-green-600 transition-all"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">
                        Approve Payment
                      </span>
                    </button>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default Invoices;
