import { Modal, Row, Col, Image, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { useEffect } from "react";

const UpdateProductModal = ({
  showUpdateProductModal,
  setShowUpdateProductModal,
  currentProductData,
  productDataRefetch,
}) => {
  const [newProduct, setNewProduct] = useState({
    name: currentProductData.name,
    price: currentProductData.price,
    stock: currentProductData.stock,
    description: currentProductData.price,
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewProduct((prevState) => {
        return { ...prevState, [e.target.name]: e.target.files };
      });
    } else {
      setNewProduct((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleUpdateProduct = useMutation(async (e) => {
    e.preventDefault();

    try {
      let body = new FormData();

      body.append("name", newProduct.name);
      body.append("price", newProduct.price);
      body.append("stock", newProduct.stock);
      body.append("description", newProduct.description);
      body.append("image", newProduct.image[0]);

      const response = await API.patch(
        `/product/${currentProductData.id}`,
        body
      );
      if (response.data.status === "success") {
        Swal.fire({
          title: "Update Product Success",
          icon: "success",
        });
        productDataRefetch();
        setShowUpdateProductModal(false);
      }
    } catch (e) {}
  });

  useEffect(() => {
    setNewProduct({
      name: currentProductData.name,
      price: currentProductData.price,
      stock: currentProductData.stock,
      description: currentProductData.price,
      image: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUpdateProductModal]);

  return (
    <Modal
      show={showUpdateProductModal}
      centered
      onHide={() => {
        setShowUpdateProductModal(false);
        setNewProduct({
          name: "",
          price: "",
          stock: "",
          description: "",
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
      dialogClassName="updateproductmodals"
    >
      <Row className="p-3">
        {/* Form */}
        <Col lg={7} className="pt-4 ps-5">
          <h1
            className="display-6 fw-bold my-3 mb-5"
            style={{ color: "#613D2B" }}
          >
            Update Product
          </h1>
          <Form onSubmit={handleUpdateProduct.mutate}>
            {/* product name */}
            <Form.Group className="mb-4" controlId="formName">
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
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
                value={newProduct.stock}
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
                value={newProduct.price}
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
                value={newProduct.description}
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
                onChange={handleChange}
                id="img-updateproduct"
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
                document.getElementById("img-updateproduct").click();
              }}
            >
              <p className="p-0 m-0 fw-normal">Photo Product</p>
              <CgAttachment className="fs-4" />
            </div>

            <div className="d-flex justify-content-center mt-3">
              {handleUpdateProduct.isLoading ? (
                <Button
                  type="submit"
                  className="mt-5 px-5 text-white fs-5 fw-bolder hoveredButton"
                  style={{
                    backgroundColor: "#613D2B",
                    border: "none",
                  }}
                  disabled
                >
                  Updating Product...
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
                  Update Product
                </Button>
              )}
            </div>
          </Form>
        </Col>

        {/* Image */}
        <Col lg={5}>
          {newProduct.image ? (
            <Image
              src={URL.createObjectURL(newProduct.image[0])}
              alt={newProduct.name}
              className="w-100 p-5"
            />
          ) : (
            <Image
              src={currentProductData.image}
              alt={newProduct.name}
              className="w-100 p-5"
            />
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default UpdateProductModal;
