import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigationbar = () => {
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
        <Nav className="ms-auto">
          <Button
            variant="outline-light"
            className="d-block d-lg-none"
            // onClick={() => {
            //   setLoginForm(true);
            // }}
          >
            Login
          </Button>
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
            // onClick={() => {
            //   setLoginForm(true);
            // }}
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
            // onClick={() => {
            //   setRegisterForm(true);
            // }}
          >
            Register
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
