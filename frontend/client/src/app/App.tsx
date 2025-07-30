// import Layout from "../components/Layout/Layout";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreateUserPage";
import LoginPage from "../pages/LoginPage"
import EditUserForm from "../components/RedactForm/RedactForm";
import {Routes, Route} from "react-router-dom"

export default function App() {
  return (
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user/create" element={<CreatePage />}></Route>
        <Route path="/user/login" element={<LoginPage />}></Route>
        <Route path="/edit/:id" element={<EditUserForm />} />
      </Route>
    </Routes>
  )
}

