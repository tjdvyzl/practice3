import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./components/views/LoginPage/LoginPage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
