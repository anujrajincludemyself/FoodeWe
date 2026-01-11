import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import MyOrder from "./screens/MyOrder";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { CartProvider } from "./components/ContextReducer";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
