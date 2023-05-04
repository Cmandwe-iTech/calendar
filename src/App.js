import React from "react";
import { Route, Routes } from "react-router-dom";
import Sign from "./components/signIn";
import Signup from "./components/register";
import Calendar from "./components/calendar";
function App(){
  return(
     <Routes>
      <Route path="/" element={<Sign/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/calendar" element={<Calendar/>}/>
     </Routes>
  )
}
export default App;