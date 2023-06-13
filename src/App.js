import "./App.css";
import RegistrationForm from "./pages/Registeration/RegisterForm";
import LoginForm from "./pages/Login/LoginForm";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <ToastContainer />
      <Router>
      {isLoggedIn && <Navbar /> }
        <Routes>
          <Route path="/" element={!isLoggedIn ? <LoginForm/> : <Home/>}/>
          <Route path="/register" element={<RegistrationForm />}/>
          <Route path="/home" element={isLoggedIn && <Home />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
