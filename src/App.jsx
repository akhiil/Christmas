import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from './Screens/homepage';
import AllTask from './Screens/AllTask';

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/allTask" element={<AllTask />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;