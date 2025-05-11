import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Layout from './Layout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './screens/login.jsx'
import Home from './screens/home.jsx'
import Rejister from './screens/rejister.jsx'



const router= createBrowserRouter([
  
  {
    path:"",
    element:<Layout/>,
    children:([
      {
        path:"",
        element:<Login/>
      


      },
      {
        path:"rejister",
        element:<Rejister/>,
      }
      ,
      {
        path:"home",
        element:<Home/>,
      }
  ])

  }
])
createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)
