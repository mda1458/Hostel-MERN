import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  links: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    for: PropTypes.string.isRequired,
  }).isRequired,
};

function Sidebar({ links }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className={`fixed md:hidden z-50 top-10 left-20 md:left-40 ml-10 bg-gray-900 p-1 w-50 h-50 rounded-full shadow-lg text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-20" : "-translate-x-20"
        }`}
        onClick={toggleMenu}
      >
        <svg
          className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
        <svg
          className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className={`flex flex-col justify-between h-screen w-screen absolute md:static sm:w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "absolute -translate-x-full"
        }`}
      >
        <Link to={`/${links[0].for}-dashboard`} className="p-4">
          <h1 className="text-3xl font-bold pt-5">Dashboard</h1>
        </Link>
        <div className="flex flex-col space-y-1 text-5xl font-bold text-white">
          {/*eslint-disable-next-line react/prop-types*/}
          {links.map((link) => (
            <Link
              to={link.url}
              key={link.text}
              className={`p-4 ${
                location.pathname === link.url
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="p-4">
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
