import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Project from "./pages/Project";

function App() {
  return (
    <div >
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/project/:projectId" element={<Project />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
