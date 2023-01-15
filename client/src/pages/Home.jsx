import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

const Home = () => {
  const navigate = useNavigate();

  const { data: productData, isisLoading: productDataIsLoading } = useQuery(
    "productDataCache",
    async (e) => {
      try {
        const response = await API.get("/products");
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  return (
    <main style={{ marginTop: 150 }}>
      {/* header dekstop */}
      <Container className="position-relative d-none d-lg-block">
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

      {/* header mobile */}
      <Container className="position-relative d-block d-lg-none">
        <div
          className="d-flex flex-column justify-content-center align-items-start px-5 py-5 position-relative"
          style={{ backgroundColor: "#DBB699", width: "100%" }}
        >
          <Image
            src="/assets/HeaderImage.svg"
            alt="header"
            // className="position-absolute"
            fluid
          />
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
      </Container>

      <Container className="my-5">
        <Row>
          {productDataIsLoading ? (
            <Col
              xs={12}
              className="d-flex flex-row justify-content-center py-5"
            >
              <Spinner
                animation="border"
                variant="danger"
                className="mx-auto"
                size="xl"
              />
            </Col>
          ) : (
            productData?.map((el) => {
              return (
                <Col lg={3} xs={6} key={el.id} className="py-2">
                  <Card
                    style={{
                      backgroundColor: "#F6E6DA",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/detail/${el.id}`);
                    }}
                  >
                    <Card.Img variant="top" src={el.image} />
                    <Card.Body>
                      <Card.Title
                        style={{ color: "#613D2B" }}
                        className="fw-bold"
                      >
                        {el.name}
                      </Card.Title>
                      <Card.Text style={{ color: "#9D5453" }}>
                        Rp {el.price.toLocaleString()},-
                        <br />
                        Stock : {el.stock}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </main>
  );
};

export default Home;
