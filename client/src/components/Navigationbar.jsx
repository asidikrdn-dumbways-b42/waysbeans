import { useContext, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { MyContext } from "../store/Store";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import DropdownProfile from "./DropdownProfile";

const Navigationbar = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const navigate = useNavigate();

  const { loginState } = useContext(MyContext);

  const { data: userProfile } = useQuery(
    "userProfileCache",
    async () => {
      const response = await API.get("/user");
      return response.data.data;
    },
    {
      enabled: !!loginState.isLogin,
    }
  );

  const { data: orderCart } = useQuery("orderCartCache", async () => {
    try {
      const response = await API.get(`/orders`);
      return response.data.data;
    } catch (e) {}
  });

  return (
    <Navbar
      bg="light"
      variant="light"
      className={`position-absolute top-0 w-100`}
      style={{
        backgroundColor: "#F5F5F5",
        height: 100,
        zIndex: 2,
        boxShadow: "0px 0px 20px #888888",
      }}
    >
      <Container style={{ zIndex: 3, padding: "0 150px" }} fluid>
        <Link to="/" className={`navbar-brand`}>
          <Image
            src="/assets/NavbarIcon.svg"
            alt="WaysBeans"
            style={{ width: 250 }}
          />
        </Link>

        {!loginState.isLogin ? (
          <Nav className="ms-auto">
            <Button
              id="navLoginButton"
              className="mx-2 d-none d-lg-block fw-5 hoveredButton"
              style={{
                width: 150,
                border: "2px solid #613D2B",
                color: "#613D2B",
                backgroundColor: "#F5F5F5",
                fontWeight: "bold",
              }}
              onClick={() => {
                setLoginForm(true);
              }}
            >
              Login
            </Button>
            <Button
              className="text-white mx-2 d-none d-lg-block hoveredButton"
              style={{
                width: 150,
                backgroundColor: "#613D2B",
                border: "2px solid #613D2B",
                fontWeight: "bold",
              }}
              onClick={() => {
                setRegisterForm(true);
              }}
            >
              Register
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            {userProfile?.role === "user" && (
              <div className="position-relative d-flex flex-row justify-content-center align-items-center hoveredDropdown">
                <Image
                  src="/assets/Basket.svg"
                  style={{ width: 50, cursor: "pointer" }}
                  className="me-4"
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
                <div
                  className="position-absolute px-2 rounded-circle text-white"
                  style={{
                    backgroundColor: "red",
                    top: 25,
                    right: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  {orderCart?.length}
                </div>
              </div>
            )}

            <DropdownProfile>
              {userProfile !== undefined && userProfile.image !== "" ? (
                <Image
                  src={userProfile.image}
                  style={{ width: 75, height: 75, objectFit: "cover" }}
                  roundedCircle
                />
              ) : (
                <Image
                  src="/assets/profile-undefined.png"
                  style={{ width: 75, height: 75, objectFit: "cover" }}
                  roundedCircle
                />
              )}
            </DropdownProfile>
          </Nav>
        )}
      </Container>

      {/* Login Modal */}
      <Login
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        setRegisterForm={setRegisterForm}
      />
      {/* Regiser Modal */}
      <Register
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        setLoginForm={setLoginForm}
      />
    </Navbar>
  );
};

export default Navigationbar;
