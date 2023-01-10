import { Button, Col, Container, Row, Card } from "react-bootstrap";

const Detail = () => {
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
              <Card.Img src="/assets/product.svg" alt="Product" fluid />
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
                  GUETAMALA Beans
                </Card.Title>
                <Card.Subtitle style={{ color: "#9D5453" }}>
                  Stock : 500
                </Card.Subtitle>

                <Card.Text className="my-3" style={{ textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                  vero eum cum ducimus optio ut perspiciatis, nisi nemo
                  voluptatum deserunt odio, dicta reprehenderit, et omnis
                  nostrum sed deleniti. Voluptate rerum blanditiis eveniet
                  doloribus sapiente quibusdam voluptas quidem, sunt ut dolor
                  odit? Reiciendis dolores sunt laborum ex ipsa reprehenderit,
                  unde dignissimos asperiores ipsam eos facilis et quibusdam,
                  accusantium nihil! Animi vitae qui ducimus deserunt! Facere
                  voluptates eaque, sunt placeat reprehenderit eum, eligendi
                  numquam consectetur dolores quod, odit libero modi ipsam
                  soluta omnis quia veniam beatae odio. Nostrum temporibus
                  consequuntur nisi consectetur vel voluptatibus qui placeat
                  odio natus repudiandae ratione facere ea animi dolorem
                  reiciendis corrupti ad excepturi, a magni pariatur omnis esse
                  nam voluptatum neque. Inventore amet tempora ducimus magni
                  harum ea iusto laborum, repudiandae adipisci, voluptate
                  tenetur saepe. Distinctio debitis, quibusdam maiores quasi
                  corrupti laboriosam ab praesentium nam eligendi inventore
                  dicta perferendis deleniti sequi molestias, nobis ut.
                  Suscipit, harum dolorum!
                </Card.Text>
                <Card.Subtitle
                  style={{ color: "#9D5453" }}
                  className="text-end my-5 fs-2 fw-bold"
                >
                  Rp 300.900,-
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
