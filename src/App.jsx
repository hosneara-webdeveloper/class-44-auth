/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */


import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import Login from './Components/Login/Login'
import Main from './LayOut/Main'
import Register from './Components/Register/Register'




function App() {
 const router =createBrowserRouter([  
  { 
    path: '/',
    element: <Main></Main>,
    children: [

      {
        path: '/',
        element: <Register></Register>

      },

      {
        path: '/Register',
        element: <Register></Register>

      },
      {
      path: '/login',
      element: <Login></Login>
    },
      
  ]
  }
 ])

  return (
    <>
      <div>
      <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App;
