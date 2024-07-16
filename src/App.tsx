
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
