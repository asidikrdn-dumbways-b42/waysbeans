import { Button, Col, Container, Row, Card, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { MyContext } from "../store/Store";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

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

  const handleAddCart = useMutation(async () => {
    try {
      const response = await API.post(`/order`, {
        product_id: parseInt(id),
      });
      if (response.data.status === "success") {
        navigate("/cart");
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  });

  return (
    <main style={{ marginTop: 150 }}>
      {detailProductIsLoading ? (
        <Container
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Spinner animation="border" size="xl" style={{ color: "#613D2B" }} />
        </Container>
      ) : (
        <Container>
          <Card
            className="rounded-5 my-2 d-flex justify-content-center align-items-center p-5"
            style={{ minHeight: "50vh", border: "none" }}
          >
            <Row className="w-100">
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

                  {handleAddCart.isLoading ? (
                    <Button
                      className="w-100 text-white hoveredButton py-2"
                      style={{
                        backgroundColor: "#613D2B",
                        border: "2px solid #613D2B",
                        fontWeight: "bold",
                      }}
                      disabled
                    >
                      <Spinner animation="border" variant="light" />
                    </Button>
                  ) : (
                    <Button
                      className="w-100 text-white hoveredButton py-2"
                      style={{
                        backgroundColor: "#613D2B",
                        border: "2px solid #613D2B",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        if (loginState.isLogin) {
                          if (detailProduct?.stock !== 0) {
                            handleAddCart.mutate();
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: "Product out of stock",
                            });
                          }
                        } else {
                          Swal.fire({
                            title: "You must be logged in to continue !",
                            icon: "error",
                          });
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </main>
  );
};

export default Detail;
