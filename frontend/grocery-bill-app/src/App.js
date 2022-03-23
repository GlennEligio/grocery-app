import * as Components from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // Remove modal when click outside content
  window.onclick = (e) => {
    const modal = document.getElementById("modal-id");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Components.Home />} />
        <Route path="/login" element={<Components.Login />} />
        <Route path="/register" element={<Components.Register />} />
        <Route path="/clerk" element={<Components.ClerkHome />} />
        <Route path="/admin" element={<Components.AdminHome />} />
        <Route path="/unauthorized" element={<Components.Unauthorized />} />
        <Route path="*" element={<Components.NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
