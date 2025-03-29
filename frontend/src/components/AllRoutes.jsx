import { Route, Routes } from "react-router-dom"
import Register from "./register"
import Login from "./Login"
import Home from "../pages/Home"
import EditTask from "./EditTask"


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<Register/>} path="/register"/>
        <Route element={<Login/>}  path="/login"/>
        <Route element={<Home/>} path="/"/>
        <Route element={<EditTask/>} path="/edit/:id" />
      </Routes>
    </div>
  )
}

export default AllRoutes
