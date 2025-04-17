import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthCallback from "./auth/AuthCallback"; // create this file
import Home from "./screens/home";
import Login from "./screens/auth/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
