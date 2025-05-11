import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Layout from './Layout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './screens/login.jsx'
import Home from './screens/home.jsx'
import Rejister from './screens/rejister.jsx'
import Blog from './screens/blogs.jsx'



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
      ,
      {
        path:"home/blogs",
        element:<Blog/>,
      }
  ])

  }
])
createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)
