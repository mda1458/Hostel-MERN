import { useState, useEffect} from "react";

function Invoices() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);

  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("student"));
    fetch("http://localhost:3000/api/invoice/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({student: student._id}),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let invoices = data.invoices;
          let List = [];
          let paidInvoices = 0;
          let pendingInvoices = 0;
    
          invoices.forEach((invoice) => {
            if (invoice.status.toLowerCase === "paid") {
              paidInvoices += 1;
            } else {
              pendingInvoices += 1;
            }
            let date = new Date(invoice.date);
            invoice.date= date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            List.push(
              {
                title: invoice.title,
                amount: "Rs. "+invoice.amount,
                status: invoice.status,
                date: invoice.date,
              }
            );
          });
          setInvoiceList(List);
          setTotalInvoices(invoices.length);
          setPaidInvoices(paidInvoices);
          setPendingInvoices(pendingInvoices);
        }
      });
  }, [invoiceList.length, totalInvoices, pendingInvoices, paidInvoices]);

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center max-h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-5xl">Invoices</h1>
      <p className="text-white text-xl text-center px-5 sm:p-0">
        All the invoices like Mess bills, Hostel fee will be shown here
      </p>
      <div className="flex gap-10 items-center my-5">
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 ml-2 text-5xl font-extrabold text-blue-700">{totalInvoices}</dt>
          <dd className="text-gray-400 text-center">Total Invoices</dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-5xl font-extrabold text-blue-700">{paidInvoices}</dt>
          <dd className="text-gray-400 ">
            Paid Invoices
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-5xl font-extrabold text-blue-700">{pendingInvoices}</dt>
          <dd className="text-gray-400">
            Pending Invoices
          </dd>
        </div>
      </div>

      <div className="w-full max-w-md p-4 border rounded-lg shadow sm:p-8 bg-neutral-950 border-neutral-900 drop-shadow-xl overflow-y-auto max-h-70">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-white">
            Latest Invoices
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-700">
            {invoiceList.map((invoice) => (
              <li className="py-3 sm:py-4" key="1">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-white">
                    {invoice.status.toLowerCase() === "pending" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                      {invoice.title}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                      {invoice.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-base font-semibold text-white">
                    {invoice.amount}
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

export default Invoices;
