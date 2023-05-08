function Sidebar() {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 py-4 px-6">
      <h1 className="text-2xl font-bold mb-8">Student Dashboard</h1>
      <ul>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Courses
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Calendar
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="hover:text-gray-400">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
}

export { Sidebar };
