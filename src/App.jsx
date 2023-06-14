import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Create from "./pages/Create.jsx"
import Update from "./pages/Update.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <nav className="bg-[#12bca2] text-center py-[10px] px-5">
        <h1 className="m-0 text-[#ffffff] font-bold tracking-widest text-xl">SupaSmoothies</h1>
        <Link to="/" className="text-[#f2f2f2] m-[10px] inline-block tracking-wider font-medium">Home</Link>
        <Link to="/create" className="text-[#f2f2f2] m-[10px] inline-block tracking-wider font-medium">Create New Smoothie</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
