import { Modal, Row, Col, Image, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { useEffect } from "react";

const UpdateProfileModals = ({
  showUpdateProfileModals,
  setShowUpdateProfileModals,
  currentProfileData,
  profileDataRefetch,
}) => {
  const [input, setInput] = useState({
    name: "",
    phone: "",
    address: "",
    post_code: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setInput((prevState) => {
        return { ...prevState, [e.target.name]: e.target.files };
      });
    } else {
      setInput((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleUpdateProfile = useMutation(async (e) => {
    e.preventDefault();

    try {
      let body = new FormData();

      body.append("name", input.name);
      body.append("phone", input.phone);
      body.append("address", input.address);
      body.append("post_code", input.post_code);
      body.append("image", input.image[0]);

      const response = await API.patch(`/user`, body);
      if (response.data.status === "success") {
        Swal.fire({
          title: "Update Profile Success",
          icon: "success",
        });
        profileDataRefetch();
        setShowUpdateProfileModals(false);
      }
    } catch (e) {}
  });

  useEffect(() => {
    currentProfileData &&
      setInput({
        name: currentProfileData.name,
        phone: currentProfileData.phone,
        address: currentProfileData.address,
        post_code: currentProfileData.post_code,
        image: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUpdateProfileModals]);

  return (
    <Modal
      show={showUpdateProfileModals}
      centered
      onHide={() => {
        setShowUpdateProfileModals(false);
        setInput({
          name: "",
          phone: "",
          address: "",
          post_code: "",
          image: "",
        });
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="rounded-0"
      dialogClassName="updateprofilemodals"
    >
      <Row className="p-3">
        {/* Form */}
        <Col lg={7} className="pt-4 ps-lg-5">
          <h1
            className="display-6 fw-bold my-3 mb-5"
            style={{ color: "#613D2B" }}
          >
            Update Profile
          </h1>
          <Form onSubmit={handleUpdateProfile.mutate}>
            {/* profile name */}
            <Form.Group className="mb-4" controlId="formName">
              <Form.Control
                type="text"
                name="name"
                value={input?.name}
                onChange={handleChange}
                placeholder="Name"
                className="py-2 px-2 fs-5 rounded-3"
                style={{
                  backgroundColor: "#D7CFCA",
                  cursor: "pointer",
                  border: "2px solid #613D2B",
                  color: "#613D2B",
                }}
              />
            </Form.Group>

            {/* phone */}
            <Form.Group className="mb-4" controlId="formPhone">
              <Form.Control
                type="text"
                name="phone"
                value={input?.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="py-2 px-2 fs-5 rounded-3"
                style={{
                  backgroundColor: "#D7CFCA",
                  cursor: "pointer",
                  border: "2px solid #613D2B",
                  color: "#613D2B",
                }}
              />
            </Form.Group>

            {/* address */}
            <Form.Group className="mb-4" controlId="formAddress">
              <Form.Control
                as="textarea"
                name="address"
                value={input?.address}
                onChange={handleChange}
                placeholder="Address"
                className="py-2 px-2 fs-5 rounded-3"
                style={{
                  backgroundColor: "#D7CFCA",
                  cursor: "pointer",
                  border: "2px solid #613D2B",
                  color: "#613D2B",
                  height: "100px",
                }}
              />
            </Form.Group>

            {/* post code */}
            <Form.Group className="mb-4" controlId="formPostCode">
              <Form.Control
                type="text"
                name="post_code"
                value={input?.post_code}
                onChange={handleChange}
                placeholder="Post Code"
                className="py-2 px-2 fs-5 rounded-3"
                style={{
                  backgroundColor: "#D7CFCA",
                  cursor: "pointer",
                  border: "2px solid #613D2B",
                  color: "#613D2B",
                }}
              />
            </Form.Group>

            {/* Image */}
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                id="img-updateprorfile"
                size="lg"
                className="d-none"
              />
            </Form.Group>

            <div
              className="py-2 px-2 fs-5 fw-bold rounded-3 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#D7CFCA",
                cursor: "pointer",
                width: "50%",
                border: "2px solid #613D2B",
                color: "#613D2B",
              }}
              onClick={() => {
                document.getElementById("img-updateprorfile").click();
              }}
            >
              <p className="p-0 m-0 fw-normal">Profile Pict</p>
              <CgAttachment className="fs-4" />
            </div>

            <div className="d-lg-flex justify-content-center mt-3 d-none">
              {handleUpdateProfile.isLoading ? (
                <Button
                  type="submit"
                  className="mt-5 px-5 text-white fs-5 fw-bolder hoveredButton"
                  style={{
                    backgroundColor: "#613D2B",
                    border: "none",
                  }}
                  disabled
                >
                  Updating Profile...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mt-5 px-5 text-white fs-5 fw-bolder hoveredButton"
                  style={{
                    backgroundColor: "#613D2B",
                    border: "none",
                  }}
                >
                  Update Profile
                </Button>
              )}
            </div>
          </Form>
        </Col>

        {/* Image */}
        <Col lg={5}>
          {input.image ? (
            <Image
              src={window.URL.createObjectURL(input.image[0])}
              alt={input.name}
              className="w-100 p-5"
            />
          ) : currentProfileData?.image ? (
            <Image
              src={currentProfileData?.image}
              alt={currentProfileData?.name}
              className="w-100 p-5"
            />
          ) : (
            <h1
              className="w-100 h-100 text-center"
              style={{ marginTop: "50%" }}
            >
              No Profile Image
            </h1>
          )}
          <div className="d-flex justify-content-center d-lg-none">
            {handleUpdateProfile.isLoading ? (
              <Button
                type="submit"
                className="px-5 text-white fs-5 fw-bolder hoveredButton"
                style={{
                  backgroundColor: "#613D2B",
                  border: "none",
                }}
                disabled
              >
                Updating Profile...
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-5 text-white fs-5 fw-bolder hoveredButton"
                style={{
                  backgroundColor: "#613D2B",
                  border: "none",
                }}
              >
                Update Profile
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default UpdateProfileModals;
