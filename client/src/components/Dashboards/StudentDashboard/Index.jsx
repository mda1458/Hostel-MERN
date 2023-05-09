import { Outlet } from "react-router-dom";
import { Sidebar } from "../Common/Sidebar"
export default function Index() {

  const dashboard = "student";
  const links = [
    {
      text: "Home",
      url: "/student-dashboard",
      for: dashboard,
    },
    {
      text: "Profile",
      url: "/student-dashboard/profile",
    },
    {
      text: "Settings",
      url: "/student-dashboard/settings",
    },
    {
      text: "Mess",
      url: "/student-dashboard/settings",
    },
    {
      text: "Attendance",
      url: "/student-dashboard/settings",
    },
    {
      text: "Invoices",
      url: "/student-dashboard/settings",
    },
    {
      text: "Complaints",
      url: "/student-dashboard/settings",
    },
    {
      text: "Suggestions",
      url: "/student-dashboard/settings",
    },
  ]

  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="w-full bg-white h-screen" >
        <Outlet />
      </div>
    </div>
  )
}
