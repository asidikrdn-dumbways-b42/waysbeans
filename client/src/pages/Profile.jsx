import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import UpdateProfileModals from "../components/UpdateProfileModal";
import { useState } from "react";

const Profile = () => {
  const [showUpdateProfileModals, setShowUpdateProfileModals] = useState(false);
  const {
    data: profileData,
    isLoading: profileDataIsLoading,
    refetch: profileDataRefetch,
  } = useQuery("profileDataCache", async () => {
    try {
      const response = await API.get("/user");
      if (response.data.status === "success") {
        return response.data.data;
      }
    } catch (err) {}
  });
  const {
    data: transactionsData,
    isLoading: transactionsDataIsLoading,
    refetch: transactionsDataRefetch,
  } = useQuery("transactionsDataCache", async () => {
    try {
      const response = await API.get("/transactions");
      if (response.data.status === "success") {
        return response.data.data;
      }
    } catch (err) {}
  });

  return (
    <main style={{ marginTop: 150 }}>
      <UpdateProfileModals
        showUpdateProfileModals={showUpdateProfileModals}
        setShowUpdateProfileModals={setShowUpdateProfileModals}
        currentProfileData={profileData}
        profileDataRefetch={profileDataRefetch}
      />
      <Container>
        <Row>
          {/* Profile */}
          <Col>
            <h1 className="display-6 fw-bold" style={{ color: "#613D2B" }}>
              My Profile
            </h1>
            {profileDataIsLoading ? (
              <Container className="mt-5 pt-5 d-flex flex-row justify-content-center align-items-center">
                <Spinner animation="border" style={{ color: "#613D2B" }} />
              </Container>
            ) : (
              <Container className="mt-5">
                <Row>
                  <Col lg={4}>
                    {profileData.image ? (
                      <Image
                        src={profileData.image}
                        alt="profile pict"
                        style={{ height: "100%", objecetFit: "contain" }}
                        fluid
                      />
                    ) : (
                      <Image
                        src="/assets/profile-undefined.png"
                        alt="profile pict"
                        style={{ height: "100%", objecetFit: "contain" }}
                        fluid
                      />
                    )}
                  </Col>
                  <Col lg={8}>
                    <h5 style={{ color: "#613D2B" }} className="fw-bold mb-1">
                      Full Name
                    </h5>
                    <p>{profileData.name ? profileData.name : "-"}</p>
                    <h5 style={{ color: "#613D2B" }} className="fw-bold mb-1">
                      Email
                    </h5>
                    <p>{profileData.email ? profileData.email : "-"}</p>
                    <h5 style={{ color: "#613D2B" }} className="fw-bold mb-1">
                      Phone
                    </h5>
                    <p>{profileData.phone ? profileData.phone : "-"}</p>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={4}>
                    <h5 style={{ color: "#613D2B" }} className="fw-bold mb-1">
                      Alamat
                    </h5>
                  </Col>
                  <Col lg={8}>
                    <p>{profileData.address ? profileData.address : "-"}</p>
                  </Col>
                  <Col lg={4}>
                    <h5 style={{ color: "#613D2B" }} className="fw-bold mb-1">
                      Post Code
                    </h5>
                  </Col>
                  <Col lg={8}>
                    <p>{profileData.post_code ? profileData.post_code : "-"}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className="text-center">
                    <Button
                      className="px-4 text-white hoveredButton py-2 mt-4"
                      style={{
                        backgroundColor: "#613D2B",
                        border: "2px solid #613D2B",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        setShowUpdateProfileModals(true);
                      }}
                    >
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>

          {/* Transaction */}
          <Col>
            <h1 className="display-6 fw-bold mb-5" style={{ color: "#613D2B" }}>
              My Transaction
            </h1>
            {transactionsData?.map((trx, i) => {
              return (
                <Card
                  style={{ border: "none", backgroundColor: "#F6E6DA" }}
                  className="my-2 py-2 px-4 rounded-1"
                  key={i}
                >
                  <Row>
                    <Col lg={9}>
                      {trx.products?.map((product, i) => {
                        return (
                          <Row key={i}>
                            <Col lg={3}>
                              <Image
                                src={product.image}
                                alt="Product"
                                className="py-2"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Col>
                            <Col lg={9} className="px-lg-0">
                              <Card.Body className="px-0 py-2">
                                <Card.Title
                                  className="fw-bold mb-2 fs-6"
                                  style={{ color: "#613D2B" }}
                                >
                                  {product.name}
                                </Card.Title>
                                <Card.Subtitle
                                  style={{ color: "#613D2B", fontSize: 12 }}
                                >
                                  {trx.order_date}
                                </Card.Subtitle>
                                <Card.Text
                                  style={{ color: "#A46161", fontSize: 12 }}
                                  className="p-0 m-0 mt-3"
                                >
                                  Price : Rp {product.price.toLocaleString()},-
                                </Card.Text>
                                <Card.Text
                                  style={{ color: "#A46161", fontSize: 12 }}
                                  className="p-0 m-0"
                                >
                                  Qty : {product.orderQty}
                                </Card.Text>
                                <Card.Text
                                  style={{ color: "#A46161", fontSize: 12 }}
                                  className="p-0 m-0 mb-3 fw-bold"
                                >
                                  Sub Total : Rp{" "}
                                  {(
                                    product.orderQty * product.price
                                  ).toLocaleString()}
                                  ,-
                                </Card.Text>
                              </Card.Body>
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                    <Col
                      lg={3}
                      className="d-flex flex-column align-items-center justify-content-center p-0"
                    >
                      <Card.Body className="d-flex flex-column align-items-center justify-content-center px-1">
                        <Image
                          src="/assets/NavbarIcon.svg"
                          alt="WaysBeans"
                          fluid
                          width={"75%"}
                        />
                        <QRCodeSVG
                          value={"transaction_id"}
                          bgColor={"#F6E6DA"}
                          size={70}
                          className="my-3"
                        />
                        <Alert
                          variant="warning"
                          className="d-inline-block text-center p-1 w-100 mb-0"
                          style={{ fontSize: 12 }}
                        >
                          {trx.status.toUpperCase()}
                        </Alert>
                        <Card.Text
                          style={{ color: "#A46161", fontSize: 14 }}
                          className="p-0 m-0 mt-2 fw-bold"
                        >
                          Total : Rp {trx.total.toLocaleString()}
                          ,-
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Profile;
