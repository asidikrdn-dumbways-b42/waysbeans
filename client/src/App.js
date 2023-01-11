import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/add-product" element={<h1>Add Product</h1>} />
        <Route path="/list-product" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
