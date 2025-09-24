import React , { useEffect, useState }from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Contact from "./pages/Contact";
import Tips from "./pages/Tips";
import "./App.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageScores from "./pages/ManageScores";
import Settings from "./pages/Settings";



const Loader = () => (
<div class="loader-wrapper">
  <div class="typewriter">
    <div class="slide"><i></i></div>
    <div class="paper"></div>
    <div class="keyboard"></div>
  </div>
</div>
);
const App = () => {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = ({ wpm, accuracy }) => {
    console.log("WPM:", wpm);
    console.log("Accuracy:", accuracy);
  };

  return (
    <>    
      {/* <Sidebar /> */}
    {loading ? (
        <Loader />
      ) : (
        
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="tips" element={<Tips/>}/> 
        <Route path="login" element={<Login />} />
        <Route path="contactus" element={<Contact/>}/>
        <Route path="test" element={<Test onFinish={handleFinish} />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/scores" element={<ManageScores />} />
          <Route path="/settings" element={<Settings />} />
      </Routes>
      )}
          
  </>
  );
}
export default App;
