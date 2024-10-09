import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCar, faCog, faSignOutAlt, faTicketAlt, faHistory, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-indigo-700 p-4">
        <UserNavbar />
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div
          className={`fixed top-16 bottom-0 bg-indigo-700 transition-transform transform z-20
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-48 w-64`}
        >
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                to="/dashboard/bookings"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
              >
                <FontAwesomeIcon icon={faHistory} className="mr-2" />
                Bookings
              </Link>
              <Link
                to="/dashboard/vehicles"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
              >
                <FontAwesomeIcon icon={faCar} className="mr-2" />
                Vehicles
              </Link>
              <Link
                to="/dashboard/tickets"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
              >
                <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
                Tickets
              </Link>
              <Link
                to="/dashboard/about"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center justify-between mt-auto px-4 pb-4">
            <Link
              to="/dashboard/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Link>
            <Link
              to="/logout"
              className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`flex-grow transition-all mt-16 p-4 overflow-y-auto 
          ${isSidebarOpen ? "ml-64" : "ml-0"} md:ml-48`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
