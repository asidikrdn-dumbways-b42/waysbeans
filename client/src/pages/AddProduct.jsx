import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { CgAttachment } from "react-icons/cg";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
  const navigate = useNavigate();

  const [inputProduct, setInputProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const validation = (input) => {
    const newError = {
      name: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    };

    let inputProduct = {
      name: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    };

    // name
    inputProduct.name = input.name.trim();
    if (inputProduct.name === "") {
      newError.name = "Please fill out this field";
    } else {
      newError.name = "";
    }

    // price
    inputProduct.price = input.price;
    if (inputProduct.price === "" || isNaN(inputProduct.price)) {
      newError.price = "Please fill out this field";
    } else if (inputProduct.price < 1) {
      newError.price = "can't be less than 1";
    } else {
      newError.price = "";
    }

    // stock
    inputProduct.stock = input.stock;
    if (inputProduct.stock === "" || isNaN(inputProduct.stock)) {
      newError.stock = "Please fill out this field";
    } else if (inputProduct.stock < 1) {
      newError.stock = "can't be less than 1";
    } else {
      newError.stock = "";
    }

    // description
    inputProduct.description = input.description.trim();
    if (inputProduct.description === "") {
      newError.description = "Please fill out this field";
    } else {
      newError.description = "";
    }

    // image
    inputProduct.image = input.image;
    if (inputProduct.image.length <= 0) {
      newError.image = "Please upload image";
    } else {
      newError.image = "";
    }

    // console.log(inputProduct);

    // jika semua newErrornya kosong, maka kirim data product baru tersebut
    if (
      newError.name === "" &&
      newError.price === "" &&
      newError.stock === "" &&
      newError.description === "" &&
      newError.image === ""
    ) {
      // reset error
      setError({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
      return inputProduct;
    } else {
      setError(newError);
      return "";
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setInputProduct((prevState) => {
        return { ...prevState, [e.target.name]: e.target.files };
      });
    } else {
      setInputProduct((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleAddProduct = useMutation(async (e) => {
    e.preventDefault();

    let newProduct = validation(inputProduct);

    try {
      let body = new FormData();

      body.append("name", newProduct.name);
      body.append("price", newProduct.price);
      body.append("stock", newProduct.stock);
      body.append("description", newProduct.description);
      body.append("image", newProduct.image[0]);

      const response = await API.post(`/product`, body);
      if (response.data.status === "success") {
        navigate("/list-product");
        Swal.fire({
          title: "Add Product Success",
          icon: "success",
        });
      }
    } catch (e) {}
  });

  return (
    <main style={{ marginTop: 150 }}>
      <Container>
        <Row>
          {/* Form */}
          <Col lg={6} className="pt-5">
            <h1 className="display-6 fw-bold my-3" style={{ color: "#613D2B" }}>
              Add Product
            </h1>
            <Form onSubmit={handleAddProduct.mutate}>
              {/* product name */}
              <Form.Group className="mb-4" controlId="formName">
                <Form.Control
                  type="text"
                  name="name"
                  value={inputProduct.name}
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
                {error.name && (
                  <Form.Text className="text-danger">{error.name}</Form.Text>
                )}
              </Form.Group>

              {/* stock */}
              <Form.Group className="mb-4" controlId="formStock">
                <Form.Control
                  type="number"
                  name="stock"
                  value={inputProduct.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="py-2 px-2 fs-5 rounded-3"
                  style={{
                    backgroundColor: "#D7CFCA",
                    cursor: "pointer",
                    border: "2px solid #613D2B",
                    color: "#613D2B",
                  }}
                />
                {error.stock && (
                  <Form.Text className="text-danger">{error.stock}</Form.Text>
                )}
              </Form.Group>

              {/* price */}
              <Form.Group className="mb-4" controlId="formPrice">
                <Form.Control
                  type="number"
                  name="price"
                  value={inputProduct.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="py-2 px-2 fs-5 rounded-3"
                  style={{
                    backgroundColor: "#D7CFCA",
                    cursor: "pointer",
                    border: "2px solid #613D2B",
                    color: "#613D2B",
                  }}
                />
                {error.price && (
                  <Form.Text className="text-danger">{error.price}</Form.Text>
                )}
              </Form.Group>

              {/* desc */}
              <Form.Group className="mb-4" controlId="formDescription">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={inputProduct.description}
                  onChange={handleChange}
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
                {error.description && (
                  <Form.Text className="text-danger">
                    {error.description}
                  </Form.Text>
                )}
              </Form.Group>

              {/* Image */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
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
              {error.image && (
                <Form.Text className="text-danger d-block">
                  {error.image}
                </Form.Text>
              )}

              <div className="d-flex justify-content-center mt-3">
                {handleAddProduct.isLoading ? (
                  <Button
                    type="submit"
                    className="mt-5 px-5 text-white fs-5 fw-bolder hoveredButton"
                    style={{
                      backgroundColor: "#613D2B",
                      border: "none",
                    }}
                    disabled
                  >
                    Adding Product...
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
                    Add Product
                  </Button>
                )}
              </div>
            </Form>
          </Col>

          {/* Image */}
          <Col lg={6}>
            {inputProduct.image && (
              <Image
                src={URL.createObjectURL(inputProduct.image[0])}
                alt={inputProduct.name}
                className="w-100 p-5"
              />
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AddProduct;
