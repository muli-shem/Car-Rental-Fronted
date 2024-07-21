
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import  Contact  from './pages/Contact'
import Error from './pages/Error'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import ExploreFleet from './Fleet/ExploreFleet'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login  from './pages/Login'
import Profile from './Features/UserProfile/Profile'
import VehicleList from './Features/Vehicles/Vehicles'
import Admindashboard from './pages/Admindashboard'
import UserTable from './Features/Users/User'
import BookingTable from './Features/Booking/BookingsTable'
import VehicleTable from './Features/AdminVehicles/Vehiclespcis'
import TicketTable from './Features/Tickets/Tickets'

import BookingFormWrapper from './Features/BookCard/VehicleCard'


function App() {
 
  const router = createBrowserRouter([
    { path: '/', element: <Home/>,
      errorElement:<Error/>,
     },
     { path: '/register', element: <Register/>,
      errorElement:<Error/>,
     },
     { path: '/contact', element: <Contact/>,
      errorElement:<Error/>,
     },
     {
      path: '/about',element:<About/>,
      errorElement:<Error/>
     },
     {
       path: '/login', element:<Login/>,
       errorElement:<Error/>
     },
     {
      path: '/dashboard', element:<Dashboard/>,
      errorElement:<Error/>,
      children:[{
        path: '/dashboard/Fleet', element:<ExploreFleet/>,
      },{
        path: '/dashboard/about', element:<About/>,
      },{
        path: '/dashboard/contact', element:<Contact/>,
      },{
        path: '/dashboard/register', element:<Register/>,
      },{
        path: '/dashboard/login', element:<Login/>,
      },
  {
      path: '/dashboard/userprofile',element:<Profile/>,
      
     },{
      path:'/dashboard/vehicles', element:<VehicleList/>
     },
     {
      path:'/dashboard/bookings', element:<BookingTable/>
     },
     {
      path:'/dashboard/tickets',element:<TicketTable/>
    },{
      path:'/dashboard/bookform', element:<BookingFormWrapper/>,
    }
    ]
    },
    {
      path:'/admindashboard', element:<Admindashboard/>,
      errorElement:<Error/>,
      children:[
        {
        path:'/admindashboard/users', element:<UserTable/>,
      },
      {
        path:'/admindashboard/dashboard', element:<VehicleList/>,
      },
      {
        path:'/admindashboard/allvehicles', element:<VehicleTable/>,
      },
   
    ]
    },
    {
      path: '/fleet', element:<ExploreFleet/>,
      errorElement:<Error/>
    },

    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
