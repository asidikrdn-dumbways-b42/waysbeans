import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  return (
    <main style={{ marginTop: 150 }}>
      <Container>
        <h1 className="display-4 fw-bold" style={{ color: "#613D2B" }}>
          My Cart
        </h1>
      </Container>
      <Container className="my-5">
        {/* list 1 */}
        <Card style={{ border: "none" }} className="my-2">
          <h3 style={{ color: "#613D2B" }}>Review Your Order</h3>
          <Row>
            <Col lg={8}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "#613D2B",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <Card
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ border: "none" }}
              >
                <Row className="w-100" g={0}>
                  <Col
                    lg={2}
                    className="d-flex justify-content-center align-items-center p-0"
                  >
                    <Card.Img src="/assets/product.svg" alt="Product" fluid />
                  </Col>
                  <Col
                    lg={10}
                    className="d-flex justify-content-center align-items-center p-0"
                  >
                    <Card.Body>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <Card.Title
                          className="fw-bold mb-2 fs-3"
                          style={{ color: "#613D2B" }}
                        >
                          GUETAMALA Beans
                        </Card.Title>
                        <Card.Text
                          style={{ color: "#A46161" }}
                          className="p-0 m-0 mb-2 fs-5"
                        >
                          Rp 300.900,-
                        </Card.Text>
                      </div>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div
                          id="qty"
                          className="d-flex justify-content-start align-items-center ms-2"
                        >
                          <FaMinus
                            style={{ color: "#613D2B", cursor: "pointer" }}
                            className="fs-4"
                          />
                          <div
                            className="px-4 mx-2 rounded-3 d-flex flex-row justify-content-center align-items-center fs-4"
                            style={{ backgroundColor: "#F6E6DA" }}
                          >
                            <p className="p-0 m-0" style={{ color: "#613D2B" }}>
                              5
                            </p>
                          </div>
                          <FaPlus
                            style={{ color: "#613D2B", cursor: "pointer" }}
                            className="fs-4"
                          />
                        </div>

                        <Card.Text
                          style={{ color: "#613D2B" }}
                          className="p-0 m-0 text-end"
                        >
                          <BsTrash
                            className="me-2 fs-3"
                            style={{ cursor: "pointer" }}
                          />
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "#613D2B",
                  border: "none",
                  opacity: "100%",
                }}
              />
            </Col>
            <Col lg={4} className="pt-1">
              <hr
                style={{
                  height: 2,
                  backgroundColor: "black",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Subtotal
                </p>
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Rp 300.900,-
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Qty
                </p>
                <p
                  style={{ color: "#A46161" }}
                  className="p-0 m-0 mb-2 fs-5 me-2"
                >
                  2
                </p>
              </div>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "black",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p
                  style={{ color: "#974A4A" }}
                  className="p-0 m-0 mb-2 fs-5 fw-bold"
                >
                  Total
                </p>
                <p
                  style={{ color: "#974A4A" }}
                  className="p-0 m-0 mb-2 fs-5 fw-bold"
                >
                  Rp 300.900,-
                </p>
              </div>
            </Col>
          </Row>
          <div className="w-100 d-flex flex-row justify-content-end">
            <Button
              className="w-25 text-white hoveredButton py-2"
              style={{
                backgroundColor: "#613D2B",
                border: "2px solid #613D2B",
                fontWeight: "bold",
              }}
            >
              Pay
            </Button>
          </div>
        </Card>
        {/* list 2 */}
        <Card style={{ border: "none" }} className="my-2">
          <h3 style={{ color: "#613D2B" }}>Review Your Order</h3>
          <Row>
            <Col lg={8}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "#613D2B",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <Card
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ border: "none" }}
              >
                <Row className="w-100" g={0}>
                  <Col
                    lg={2}
                    className="d-flex justify-content-center align-items-center p-0"
                  >
                    <Card.Img src="/assets/product.svg" alt="Product" fluid />
                  </Col>
                  <Col
                    lg={10}
                    className="d-flex justify-content-center align-items-center p-0"
                  >
                    <Card.Body>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <Card.Title
                          className="fw-bold mb-2 fs-3"
                          style={{ color: "#613D2B" }}
                        >
                          GUETAMALA Beans
                        </Card.Title>
                        <Card.Text
                          style={{ color: "#A46161" }}
                          className="p-0 m-0 mb-2 fs-5"
                        >
                          Rp 300.900,-
                        </Card.Text>
                      </div>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div
                          id="qty"
                          className="d-flex justify-content-start align-items-center ms-2"
                        >
                          <FaMinus
                            style={{ color: "#613D2B", cursor: "pointer" }}
                            className="fs-4"
                          />
                          <div
                            className="px-4 mx-2 rounded-3 d-flex flex-row justify-content-center align-items-center fs-4"
                            style={{ backgroundColor: "#F6E6DA" }}
                          >
                            <p className="p-0 m-0" style={{ color: "#613D2B" }}>
                              5
                            </p>
                          </div>
                          <FaPlus
                            style={{ color: "#613D2B", cursor: "pointer" }}
                            className="fs-4"
                          />
                        </div>

                        <Card.Text
                          style={{ color: "#613D2B" }}
                          className="p-0 m-0 text-end"
                        >
                          <BsTrash
                            className="me-2 fs-3"
                            style={{ cursor: "pointer" }}
                          />
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "#613D2B",
                  border: "none",
                  opacity: "100%",
                }}
              />
            </Col>
            <Col lg={4} className="pt-1">
              <hr
                style={{
                  height: 2,
                  backgroundColor: "black",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Subtotal
                </p>
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Rp 300.900,-
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Qty
                </p>
                <p
                  style={{ color: "#A46161" }}
                  className="p-0 m-0 mb-2 fs-5 me-2"
                >
                  2
                </p>
              </div>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "black",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p
                  style={{ color: "#974A4A" }}
                  className="p-0 m-0 mb-2 fs-5 fw-bold"
                >
                  Total
                </p>
                <p
                  style={{ color: "#974A4A" }}
                  className="p-0 m-0 mb-2 fs-5 fw-bold"
                >
                  Rp 300.900,-
                </p>
              </div>
            </Col>
          </Row>
          <div className="w-100 d-flex flex-row justify-content-end">
            <Button
              className="w-25 text-white hoveredButton py-2"
              style={{
                backgroundColor: "#613D2B",
                border: "2px solid #613D2B",
                fontWeight: "bold",
              }}
            >
              Pay
            </Button>
          </div>
        </Card>
        {/* list 3 */}
        <Card style={{ border: "none" }} className="my-2">
          <h3 style={{ color: "#613D2B" }}>Review Your Order</h3>
          <Row>
            <Col lg={8}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "#613D2B",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <Card
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ border: "none" }}
              >
                <Row className="w-100" g={0}>
                  <Col
                    lg={2}
                    className="d-flex justify-content-center align-items-center p-0"
                  >
                    <Card.Img src="/assets/product.svg" alt="Product" fluid />
                  </Col>
                  <Col
                    lg={10}
                    className="d-flex justify-content-center align-items-center p-0"
                  >
                    <Card.Body>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <Card.Title
                          className="fw-bold mb-2 fs-3"
                          style={{ color: "#613D2B" }}
                        >
                          GUETAMALA Beans
                        </Card.Title>
                        <Card.Text
                          style={{ color: "#A46161" }}
                          className="p-0 m-0 mb-2 fs-5"
                        >
                          Rp 300.900,-
                        </Card.Text>
                      </div>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div
                          id="qty"
                          className="d-flex justify-content-start align-items-center ms-2"
                        >
                          <FaMinus
                            style={{ color: "#613D2B", cursor: "pointer" }}
                            className="fs-4"
                          />
                          <div
                            className="px-4 mx-2 rounded-3 d-flex flex-row justify-content-center align-items-center fs-4"
                            style={{ backgroundColor: "#F6E6DA" }}
                          >
                            <p className="p-0 m-0" style={{ color: "#613D2B" }}>
                              5
                            </p>
                          </div>
                          <FaPlus
                            style={{ color: "#613D2B", cursor: "pointer" }}
                            className="fs-4"
                          />
                        </div>

                        <Card.Text
                          style={{ color: "#613D2B" }}
                          className="p-0 m-0 text-end"
                        >
                          <BsTrash
                            className="me-2 fs-3"
                            style={{ cursor: "pointer" }}
                          />
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "#613D2B",
                  border: "none",
                  opacity: "100%",
                }}
              />
            </Col>
            <Col lg={4} className="pt-1">
              <hr
                style={{
                  height: 2,
                  backgroundColor: "black",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Subtotal
                </p>
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Rp 300.900,-
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p style={{ color: "#A46161" }} className="p-0 m-0 mb-2 fs-5">
                  Qty
                </p>
                <p
                  style={{ color: "#A46161" }}
                  className="p-0 m-0 mb-2 fs-5 me-2"
                >
                  2
                </p>
              </div>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "black",
                  border: "none",
                  opacity: "100%",
                }}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <p
                  style={{ color: "#974A4A" }}
                  className="p-0 m-0 mb-2 fs-5 fw-bold"
                >
                  Total
                </p>
                <p
                  style={{ color: "#974A4A" }}
                  className="p-0 m-0 mb-2 fs-5 fw-bold"
                >
                  Rp 300.900,-
                </p>
              </div>
            </Col>
          </Row>
          <div className="w-100 d-flex flex-row justify-content-end">
            <Button
              className="w-25 text-white hoveredButton py-2"
              style={{
                backgroundColor: "#613D2B",
                border: "2px solid #613D2B",
                fontWeight: "bold",
              }}
            >
              Pay
            </Button>
          </div>
        </Card>
      </Container>
    </main>
  );
};

export default Cart;
