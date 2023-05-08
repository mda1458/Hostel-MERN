import "./App.css";
import About from "./components/About/index";
import Navbar from "./components/LandingPage/Navbar";
import LandingPage from "./components/LandingPage/index";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/AuthPage/Index";
import SignIn from "./components/AuthPage/SignIn";
import RequestAcc from "./components/AuthPage/Request";
import AdminSignIn from "./components/AuthPage/AdminSignIn";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path='/auth' element={<Auth  />}>
          <Route index element={<SignIn/>} />
          <Route path='login' element={<SignIn />} />
          <Route path='request' element={<RequestAcc />} />
          <Route path='admin-login' element={<AdminSignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
