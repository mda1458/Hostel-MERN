import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  links: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    for: PropTypes.string.isRequired,
    svg: PropTypes.element.isRequired,
  }).isRequired,
};

function Sidebar({ links }) {
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if(window.innerWidth >= 768) {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
  }, []);

  return (
    <div>
      <button
        className={`fixed flex gap-2 md:hidden z-50 top-[6rem] left-20 md:left-20 ml-10 bg-black p-1 w-50 h-50 rounded-full shadow-lg text-white transition-transform duration-300 ease-in-out transform ${
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
        className={`flex flex-col justify-between h-screen w-screen absolute md:static sm:w-64 bg-black text-white transition-transform duration-300 ease-in-out z-40 transform ${
          isOpen ? "translate-x-0" : "absolute -translate-x-full"
        }`}
      >
        <Link
          to={`/${links[0].for}-dashboard`}
          className="py-4 px-4 md:py-5 lg:py-4 gap-2 bg-blue-700 flex items-center text-2xl"
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
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>{" "}
          <span className="md:hidden lg:inline">Dashboard</span>
        </Link>
        <div className="flex flex-col space-y-1 text-2xl text-white">
          {/*eslint-disable-next-line react/prop-types*/}
          {links.map((link) => (
            <Link
              to={link.url}
              key={link.text}
              className={`py-2 px-4 flex items-center gap-2 ${
                location.pathname === link.url
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              {link.svg}
              {link.text}
            </Link>
          ))}
        </div>
        <div className="p-4">
          <button
            onClick={logout}
            type="submit"
            className="w-full flex gap-2 justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
