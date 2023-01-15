import { useContext, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { loginSuccess } from "../../store/actions/loginAction";
import { MyContext } from "../../store/Store";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ loginForm, setLoginForm, setRegisterForm }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { dispatchLogin } = useContext(MyContext);

  const handleInputChange = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = useMutation(async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", input);
      // console.log("Login Response :", response);
      if (response.data.status === "success") {
        setAuthToken(response.data.data.token);
        dispatchLogin(loginSuccess(response.data.data));
        setInput({
          email: "",
          password: "",
        });
        setLoginForm(false);
        Swal.fire({
          title: "Login Success",
          icon: "success",
        });
      }
    } catch (e) {
      // console.log(e);
      Swal.fire({
        title: "Login Failed",
        text: e.response.data.message,
        icon: "error",
      });
    }
  });

  return (
    <Modal
      show={loginForm}
      centered
      onHide={() => {
        setInput({
          email: "",
          password: "",
        });
        setShowPassword(false);
        setLoginForm(false);
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        // backgroundColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="rounded-0"
    >
      <Modal.Title
        className="display-5 fw-bold p-4"
        style={{ color: "#613D2B" }}
      >
        Login
      </Modal.Title>

      <Form className="px-4" onSubmit={handleLogin.mutate}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={input.email}
            className="py-2 px-2 fs-5 rounded-3"
            style={{
              backgroundColor: "#D7CFCA",
              border: "2px solid #613D2B",
              color: "#613D2B",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={input.password}
              className="py-2 px-2 fs-5 rounded-start"
              style={{
                backgroundColor: "#D7CFCA",
                border: "2px solid #613D2B",
                color: "#613D2B",
              }}
            />
            <InputGroup.Text
              style={{
                backgroundColor: "#D7CFCA",
                cursor: "pointer",
                border: "2px solid #613D2B",
                color: "#613D2B",
              }}
              onClick={() => {
                setShowPassword((prevState) => {
                  return !prevState;
                });
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {handleLogin.isLoading ? (
          <Button
            type="submit"
            className="w-100 text-white fs-4 fw-bolder hoveredButton"
            style={{ backgroundColor: "#613D2B", border: "none" }}
            disabled
          >
            <Spinner animation="border" variant="light" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-100 text-white fs-4 fw-bolder hoveredButton"
            style={{ backgroundColor: "#613D2B", border: "none" }}
          >
            Login
          </Button>
        )}

        <p className="fs-5 my-3 mx-auto text-center pt-1">
          Don't have an account? ? Klik{" "}
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              setLoginForm(false);
              setRegisterForm(true);
            }}
          >
            Here
          </b>
        </p>
      </Form>
    </Modal>
  );
};

export default Login;
