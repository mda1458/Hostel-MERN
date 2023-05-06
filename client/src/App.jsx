import './App.css'
import LandingPage  from './components/LandingPage/index'
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
    </Routes>
    </>
  )
}

export default App
