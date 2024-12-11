import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RegisterPage } from "./pages/authentication/RegisterPage";

import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register/" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
