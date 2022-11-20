
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useState, useEffect} from "react"

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)
    useEffect(() => {
       if (localStorage.getItem("SESSION_ID")){
            setAuthenticated(true)
       } else {
            setAuthenticated(false)
       }
    }, [])
  return (
    <div className="App">
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
          {!isAuthenticated && 
          (<><Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /></>)
          }
              
            </Routes>
          </BrowserRouter>
        </main>
    </div>
  );
}

export default App;
