import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Services from "../pages/Services"
import NotFound from "../pages/NotFound"


function ReactRouter() {
  return (
   
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/services" element={<Services />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
   
  )
}

export default ReactRouter