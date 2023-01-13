import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigationbar from "./components/Navigationbar";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import IncomeTransaction from "./pages/IncomeTransaction";
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import { MyContext } from "./store/Store";
import { setAuthToken, API } from "./config/api";
import { authSuccess, authError } from "./store/actions/loginAction";
import { useContext, useEffect } from "react";
import PublicRoute from "./components/PrivateRoute/PublicRoute";
import UserPrivateRoute from "./components/PrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoute/AdminPrivateRoute";
import { useQuery } from "react-query";

function App() {
  const { dispatchLogin } = useContext(MyContext);

  const { refetch: orderCartRefetch } = useQuery("orderCartCache", async () => {
    try {
      const response = await API.get(`/orders`);
      return response.data.data;
    } catch (e) {}
  });

  const checkAuth = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const response = await API.get("/check-auth");
      if (response.data.status === "success") {
        dispatchLogin(authSuccess(response.data.data));
        orderCartRefetch();
      }
    } catch (err) {
      localStorage.removeItem("token");
      dispatchLogin(authError());
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        <Route element={<UserPrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/list-product" element={<ProductList />} />
          <Route path="/transactions" element={<IncomeTransaction />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
