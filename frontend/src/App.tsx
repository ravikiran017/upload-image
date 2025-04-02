import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import ShowImages from "./components/ShowImages";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ShowImages />} />
        <Route path="/upload-image" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
};

export default App;

