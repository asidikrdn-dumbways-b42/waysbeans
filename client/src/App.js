import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";
import IncomeTransaction from "./pages/IncomeTransaction";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/list-product" element={<ProductList />} />
        <Route path="/transactions" element={<IncomeTransaction />} />
      </Routes>
    </>
  );
}

export default App;
