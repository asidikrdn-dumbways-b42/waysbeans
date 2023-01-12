import { useContext } from "react";
import { Col, Dropdown, Image, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { logout } from "../store/actions/loginAction";
import { MyContext } from "../store/Store";

const DropdownProfile = (props) => {
  const { dispatchLogin } = useContext(MyContext);
  const navigate = useNavigate();

  const { data: userProfile } = useQuery("userProfileCache", async () => {
    const response = await API.get("/user");
    return response.data.data;
  });

  return (
    <Dropdown className="position-relative" autoClose>
      <Dropdown.Toggle
        style={{ backgroundColor: "transparent", border: "none" }}
        id="dropdown-profile"
      >
        {props.children}
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          marginLeft: -125,
          marginTop: 10,
          width: 200,
          zIndex: 999,
          border: "none",
          boxShadow: "1px 1px 5px #8F8F8F",
        }}
      >
        <Image
          src="/assets/dropdown-polygon.png"
          className="position-absolute"
          style={{ top: -12, right: 15, width: 20 }}
        />

        {userProfile?.role === "admin" ? (
          <Row>
            {/* Admin Dropdown */}
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item hoveredDropdown"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/add-product");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <Image
                  src="/assets/CoffeBean.svg"
                  alt="Coffe Beans"
                  className="me-2 fs-3 text-info"
                  width={"20%"}
                />
                <h5 className="m-0">Add Product</h5>
              </div>
            </Col>
            <Col lg={12}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "gray",
                  border: "none",
                  opacity: "25%",
                }}
              />
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item hoveredDropdown"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/list-product");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <Image
                  src="/assets/CoffeBean.svg"
                  alt="Coffe Beans"
                  className="me-2 fs-3 text-info"
                  width={"20%"}
                />
                <h5 className="m-0">List Product</h5>
              </div>
            </Col>
            <Col lg={12}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "gray",
                  border: "none",
                  opacity: "25%",
                }}
              />
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item hoveredDropdown"
                style={{ cursor: "pointer" }}
              >
                <Image
                  src="/assets/Logout.svg"
                  alt="Coffe Beans"
                  className="me-2 fs-3 text-info"
                  width={"20%"}
                />
                <h5 className="m-0">Logout</h5>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            {/* User Dropdown */}
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item hoveredDropdown"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/profile");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <Image
                  src="/assets/Profile.svg"
                  alt="Coffe Beans"
                  className="me-2 fs-3 text-info"
                  width={"20%"}
                />
                <h5 className="m-0">Profile</h5>
              </div>
            </Col>
            <Col lg={12}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "gray",
                  border: "none",
                  opacity: "25%",
                }}
              />
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item hoveredDropdown"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAuthToken();
                  dispatchLogin(logout());
                  // navigate("/");
                }}
              >
                <Image
                  src="/assets/Logout.svg"
                  alt="Coffe Beans"
                  className="me-2 fs-3 text-info"
                  width={"20%"}
                />
                <h5 className="m-0">Logout</h5>
              </div>
            </Col>
          </Row>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownProfile;
