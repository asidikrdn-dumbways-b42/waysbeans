import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main style={{ marginTop: 150 }}>
      <Container className="position-relative">
        <div
          className="d-flex flex-column justify-content-center align-items-start px-5 py-5 position-relative"
          style={{ backgroundColor: "#DBB699", width: "90%" }}
        >
          <Image
            className="mt-5"
            src="/assets/HeaderIcon.svg"
            alt="WaysBeans"
            width={"55%"}
          />
          <div className="h3">BEST QUALITY COFFEE BEANS</div>
          <p className="mt-3 mb-5 fs-5">
            Quality freshly roasted coffee made just for you.
            <br />
            Pour, brew and enjoy
          </p>
          <Image
            src="/assets/Waves.svg"
            alt="waves"
            className="position-absolute"
            style={{ width: "40%", bottom: "5%", right: "8%" }}
          />
        </div>
        <Image
          src="/assets/HeaderImage.svg"
          alt="header"
          className="position-absolute"
          style={{ width: "40%", top: "5%", right: 12 }}
        />
      </Container>
      <Container className="my-5">
        <Row>
          <Col lg={3} xs={6}>
            <Card
              style={{
                backgroundColor: "#F6E6DA",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/detail");
              }}
            >
              <Card.Img variant="top" src="/assets/Product.svg" />
              <Card.Body>
                <Card.Title style={{ color: "#613D2B" }} className="fw-bold">
                  RWANDA Beans
                </Card.Title>
                <Card.Text style={{ color: "#9D5453" }}>
                  Rp 299.900,-
                  <br />
                  Stock : 200
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xs={6}>
            <Card style={{ backgroundColor: "#F6E6DA", border: "none" }}>
              <Card.Img variant="top" src="/assets/Product.svg" />
              <Card.Body>
                <Card.Title style={{ color: "#613D2B" }} className="fw-bold">
                  RWANDA Beans
                </Card.Title>
                <Card.Text style={{ color: "#9D5453" }}>
                  Rp 299.900,-
                  <br />
                  Stock : 200
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xs={6}>
            <Card style={{ backgroundColor: "#F6E6DA", border: "none" }}>
              <Card.Img variant="top" src="/assets/Product.svg" />
              <Card.Body>
                <Card.Title style={{ color: "#613D2B" }} className="fw-bold">
                  RWANDA Beans
                </Card.Title>
                <Card.Text style={{ color: "#9D5453" }}>
                  Rp 299.900,-
                  <br />
                  Stock : 200
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xs={6}>
            <Card style={{ backgroundColor: "#F6E6DA", border: "none" }}>
              <Card.Img variant="top" src="/assets/Product.svg" />
              <Card.Body>
                <Card.Title style={{ color: "#613D2B" }} className="fw-bold">
                  RWANDA Beans
                </Card.Title>
                <Card.Text style={{ color: "#9D5453" }}>
                  Rp 299.900,-
                  <br />
                  Stock : 200
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
