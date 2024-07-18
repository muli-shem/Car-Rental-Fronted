import { Link, Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";


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
            
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
            
              <Link
                to="/dashboard/bookings"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                Booking
              </Link>
              <Link
                to="/dashboard/vehicles"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                Vehicles
              </Link>
              <Link
                to="/dashboard/tickets"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                Tickets
              </Link>
              <Link
                to="/dashboard/about"
                className="group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-600"
              >
                About Us
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex-grow ml-64 mt-16 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
