import "./App.css";
import About from "./components/LandingPage/About/index";
import Navbar from "./components/LandingPage/Navbar";
import LandingPage from "./components/LandingPage/index";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
