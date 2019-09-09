import React from "react";
import "./App.css";
import Navbar from "./components/navabar";
import Tasks from "./components/tasks.jsx";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Tasks />
    </div>
  );
}

export default App;
