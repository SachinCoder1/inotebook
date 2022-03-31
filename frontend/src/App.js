import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState({ message: "", type: "" })
  const showAlert = (message, type) => {
    setalert({ message, type })
    setTimeout(() => {
      setalert({ message: "", type: "" })
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="blockHieght">

            <Alert message={alert.message} type={alert.type} />
          </div>
          <div className="container">

            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;