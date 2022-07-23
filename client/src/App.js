import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./components/views/LoginPage/LoginPage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/login" element={Auth(LoginPage, false)}/>
        <Route path="/register" element={Auth(RegisterPage, false)}/>
      </Routes>
    </Router>
  );
}

export default App;
