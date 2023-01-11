import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { CgAttachment } from "react-icons/cg";

const AddProduct = () => {
  return (
    <main style={{ marginTop: 150 }}>
      <Container>
        <Row>
          {/* Form */}
          <Col lg={6} className="pt-5">
            <h1 className="display-6 fw-bold my-3" style={{ color: "#613D2B" }}>
              Add Product
            </h1>
            <Form>
              {/* product name */}
              <Form.Group className="mb-4" controlId="formName">
                {/* <Form.Label className="h3 fw-bolder">Name</Form.Label> */}
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="py-2 px-2 fs-5 rounded-3"
                  style={{
                    backgroundColor: "#D7CFCA",
                    cursor: "pointer",
                    border: "2px solid #613D2B",
                    color: "#613D2B",
                  }}
                />
                {/* {error.name && (
                  <Form.Text className="text-danger">{error.name}</Form.Text>
                )} */}
              </Form.Group>

              {/* stock */}
              <Form.Group className="mb-4" controlId="formStock">
                {/* <Form.Label className="h3 fw-bolder">Stock</Form.Label> */}
                <Form.Control
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  className="py-2 px-2 fs-5 rounded-3"
                  style={{
                    backgroundColor: "#D7CFCA",
                    cursor: "pointer",
                    border: "2px solid #613D2B",
                    color: "#613D2B",
                  }}
                />
                {/* {error.stock && (
                  <Form.Text className="text-danger">{error.stock}</Form.Text>
                )} */}
              </Form.Group>

              {/* price */}
              <Form.Group className="mb-4" controlId="formPrice">
                {/* <Form.Label className="h3 fw-bolder">Price</Form.Label> */}
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="py-2 px-2 fs-5 rounded-3"
                  style={{
                    backgroundColor: "#D7CFCA",
                    cursor: "pointer",
                    border: "2px solid #613D2B",
                    color: "#613D2B",
                  }}
                />
                {/* {error.price && (
                  <Form.Text className="text-danger">{error.price}</Form.Text>
                )} */}
              </Form.Group>

              {/* desc */}
              <Form.Group className="mb-4" controlId="formDescription">
                {/* <Form.Label className="h3 fw-bolder">Description</Form.Label> */}
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Products Description"
                  className="py-2 px-2 fs-5 rounded-3"
                  style={{
                    backgroundColor: "#D7CFCA",
                    cursor: "pointer",
                    border: "2px solid #613D2B",
                    color: "#613D2B",
                    height: "100px",
                  }}
                />
                {/* {error.description && (
                  <Form.Text className="text-danger">
                    {error.description}
                  </Form.Text>
                )} */}
              </Form.Group>

              {/* Image */}
              <Form.Group className="mb-3">
                {/* <Form.Label className="h3 fw-bolder">Image</Form.Label> */}
                {/* {error.images && (
                  <Form.Text className="text-danger d-block">
                    {error.images}
                  </Form.Text>
                )} */}
                <Form.Control
                  type="file"
                  name="image"
                  id="img-addproduct"
                  size="lg"
                  className="d-none"
                />
              </Form.Group>

              <div
                className="py-2 px-2 fs-5 fw-bold rounded-3 d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "#D7CFCA",
                  cursor: "pointer",
                  width: "30%",
                  border: "2px solid #613D2B",
                  color: "#613D2B",
                }}
                onClick={() => {
                  document.getElementById("img-addproduct").click();
                }}
              >
                <p className="p-0 m-0 fw-normal">Photo Product</p>
                <CgAttachment className="fs-4" />
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Button
                  type="submit"
                  className="mt-5 px-5 text-white fs-5 fw-bolder hoveredButton"
                  style={{
                    backgroundColor: "#613D2B",
                    border: "none",
                  }}
                >
                  Add Product
                </Button>
                {/* {handleAddTrip.isLoading ? (
                  <Button
                    variant="warning"
                    type="submit"
                    className="px-5 text-white fs-5 fw-bolder"
                    disabled
                  >
                    Adding Trip...
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    type="submit"
                    className="px-5 text-white fs-5 fw-bolder"
                  >
                    Add Trip
                  </Button>
                )} */}
              </div>
            </Form>
          </Col>

          {/* Image */}
          <Col lg={6}>
            <Image
              src="/assets/product.svg"
              alt="product image"
              className="w-100 p-5"
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AddProduct;
