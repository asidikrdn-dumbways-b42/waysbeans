import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useContext } from "react";
import { MyContext } from "../store/Store";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

const Detail = () => {
  const { loginState } = useContext(MyContext);

  // mengambil id trip dari url
  const id = useParams().id;
  const navigate = useNavigate();

  const { data: detailProduct, isLoading: detailProductIsLoading } = useQuery(
    "detailProductCache",
    async () => {
      try {
        const response = await API.get(`/product/${id}`);
        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  return (
    <main style={{ marginTop: 150 }}>
      <Container>
        <Card
          className="rounded-5 my-2 d-flex justify-content-center align-items-center p-5"
          style={{ minHeight: "50vh", border: "none" }}
        >
          <Row>
            <Col
              lg={5}
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Img src={detailProduct?.image} alt="Product" fluid />
            </Col>
            <Col
              lg={7}
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Body>
                <Card.Title
                  className="display-4 fw-bold"
                  style={{ color: "#613D2B" }}
                >
                  {detailProduct?.name}
                </Card.Title>
                <Card.Subtitle style={{ color: "#9D5453" }}>
                  Stock : {detailProduct?.stock}
                </Card.Subtitle>

                <Card.Text className="my-3" style={{ textAlign: "justify" }}>
                  {detailProduct?.description}
                </Card.Text>
                <Card.Subtitle
                  style={{ color: "#9D5453" }}
                  className="text-end my-5 fs-2 fw-bold"
                >
                  Rp {detailProduct?.price.toLocaleString()},-
                </Card.Subtitle>

                <Button
                  className="w-100 text-white hoveredButton py-2"
                  style={{
                    backgroundColor: "#613D2B",
                    border: "2px solid #613D2B",
                    fontWeight: "bold",
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
};

export default Detail;
