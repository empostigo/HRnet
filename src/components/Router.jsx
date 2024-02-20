// React Router
import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"

// Pages
import Home from "../Pages/Home/Home"
import Employees from "../Pages/Employees/Employees"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
    </>
  )
)

const Router = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default Router
