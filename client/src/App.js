import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<h1>Detail</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/add-product" element={<h1>Add Product</h1>} />
        <Route path="/list-product" element={<h1>List Product</h1>} />
      </Routes>
    </>
  );
}

export default App;
