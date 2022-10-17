import React from "react";
import SearchPage from "./screens/SearchPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultsPage from "./screens/ResultsPage";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />}/>
          <Route path="/:handle" element={<ResultsPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
