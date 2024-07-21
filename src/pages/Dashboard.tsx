import { Link, Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faCog, faSignOutAlt,faTicketAlt, faHistory,faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-10">
        <UserNavbar />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col w-64 bg-indigo-800 fixed top-16 bottom-0">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {/* Add your logo or profile image here */}
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                to="/dashboard/bookings"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                <FontAwesomeIcon icon={faHistory} className="mr-2" />
                Bookings
              </Link>
              <Link
                to="/dashboard/vehicles"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                <FontAwesomeIcon icon={faCar} className="mr-2" />
                Vehicles
              </Link>
              <Link
                to="/dashboard/tickets"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
                Tickets
              </Link>
              <Link
                to="/dashboard/about"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center justify-between mt-auto px-4 pb-4">
            <Link
              to="/dashboard/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Link>
            <Link
              to="/logout"
              className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </Link>
          </div>
        </div>
        <div className="flex-grow ml-64 mt-16 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
