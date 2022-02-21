import * as Components from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

function App() {
  // Remove modal when click outside content
  window.onclick = (e) => {
    const modal = document.getElementById("modal-id");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <div className="viewContainer">
            <Routes>
              <Route path="/" element={<Components.Home />} />
              <Route path="/login" element={<Components.Login />} />
              <Route path="/register" element={<Components.Register />} />
              <Route path="/clerk" element={<Components.ClerkHome />} />
              <Route path="/admin" element={<Components.AdminHome />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
