import * as Components from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Components.Header />
          <Components.SideNav />
          <div className="viewContainer">
            <Routes>
              <Route path="/items" element={<Components.Items />} />
              <Route path="/" element={<Components.Home />} />
              <Route path="/register" element={<Components.Register />} />
              <Route path="/login" element={<Components.Login />} />
            </Routes>
          </div>
          <Components.Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
