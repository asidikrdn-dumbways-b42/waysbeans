import { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

const Register = ({ registerForm, setRegisterForm, setLoginForm }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  // fungsi untuk menghandle saat terjadi perubahan pada input form
  const handleInputChange = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const validation = (inputItem) => {
    const newError = {
      name: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      address: "",
    };

    // Validasi name
    let name = inputItem.name.trim();
    if (name === "") {
      newError.name = "Name must be fill !";
    } else {
      newError.name = "";
    }

    // Validasi Email
    let email = inputItem.email.trim();
    if (email === "") {
      newError.email = "Email must be fill !";
    } else {
      newError.email = "";
    }

    // Validasi Password
    let password = inputItem.password.trim();
    if (password === "") {
      newError.password = "Password must be fill !";
    } else if (/[A-Z]/.test(password) === false) {
      newError.password =
        "The password must be a combination of uppercase, lowercase, and numbers!!";
    } else if (/[a-z]/.test(password) === false) {
      newError.password =
        "The password must be a combination of uppercase, lowercase, and numbers!!";
    } else if (/[0-9]/.test(password) === false) {
      newError.password =
        "The password must be a combination of uppercase, lowercase, and numbers!!";
    } else {
      newError.password = "";
    }

    if (
      newError.name === "" &&
      newError.email === "" &&
      newError.password === ""
    ) {
      // reset error
      setError({
        name: "",
        email: "",
        password: "",
      });
      return true;
    } else {
      setError(newError);
      return false;
    }
  };

  // fungsi untuk menghandle saat form di-submit
  const handleSubmitForm = useMutation(async (e) => {
    e.preventDefault();

    if (validation(input)) {
      // kirim data user baru
      try {
        // Configuration Content-type
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        // Data body
        const body = JSON.stringify(input);

        // Insert data user to database
        const response = await API.post("/register", body, config);

        // console.log(response.data);

        // Notification
        if (response.data.status === "success") {
          // reset input
          setInput({
            name: "",
            email: "",
            password: "",
            gender: "",
          });

          // tutup form register dan buka form login
          setRegisterForm(false);
          Swal.fire({
            title: "Register Success",
            text: "Now, check and verify your email",
            icon: "info",
          });
          setLoginForm(true);
        }
      } catch (e) {
        Swal.fire({
          title: "Register Failed",
          text: e.response.data.message,
          icon: "error",
        });
      }
    }
  });

  return (
    <Modal
      show={registerForm}
      centered
      id="register-modal"
      onHide={() => {
        setRegisterForm(false);
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        // backgroundColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="rounded-0"
    >
      <Modal.Title
        className="display-5 fw-bold p-4"
        style={{ color: "#613D2B" }}
      >
        Register
      </Modal.Title>

      <Form className="px-4" onSubmit={handleSubmitForm.mutate}>
        {/*  */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            value={input.name}
            onChange={handleInputChange}
            className="py-2 px-2 fs-5 rounded-3"
            style={{
              backgroundColor: "#D7CFCA",
              cursor: "pointer",
              border: "2px solid #613D2B",
              color: "#613D2B",
            }}
          />
          {error.name && (
            <Form.Text className="text-danger">{error.name}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={input.email}
            onChange={handleInputChange}
            className="py-2 px-2 fs-5 rounded-3"
            style={{
              backgroundColor: "#D7CFCA",
              cursor: "pointer",
              border: "2px solid #613D2B",
              color: "#613D2B",
            }}
          />
          {error.email && (
            <Form.Text className="text-danger">{error.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleInputChange}
            className="py-2 px-2 fs-5 rounded-3"
            style={{
              backgroundColor: "#D7CFCA",
              cursor: "pointer",
              border: "2px solid #613D2B",
              color: "#613D2B",
            }}
          />
          {error.password && (
            <Form.Text className="text-danger">{error.password}</Form.Text>
          )}
        </Form.Group>

        {handleSubmitForm.isLoading ? (
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
            Register
          </Button>
        )}

        <p className="fs-5 my-3 mx-auto text-center pt-1">
          Already have an account? ? Klik{" "}
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              setRegisterForm(false);
              setLoginForm(true);
            }}
          >
            Here
          </b>
        </p>
      </Form>
    </Modal>
  );
};

export default Register;
