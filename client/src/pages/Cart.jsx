import { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import Swal from "sweetalert2";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const {
    data: orderCart,
    isLoading: orderCartIsLoading,
    refetch: orderCartRefetch,
  } = useQuery("orderCartCache", async () => {
    try {
      const response = await API.get(`/orders`);
      if (response.data.status === "success") {
        if (response.data.data === null) {
          Swal.fire({
            title: "Your Cart is Empty",
            text: "Please check our product",
            icon: "info",
          });
          navigate("/");
        }
        return response.data.data;
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleAddQty = useMutation(async (id) => {
    // console.log("tambah");
    try {
      const response = await API.patch(`/order/${id}`, {
        event: "add",
      });
      if (response.data.status === "success") {
        orderCartRefetch();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleLessQty = useMutation(async (id) => {
    // console.log("kurang");
    try {
      const response = await API.patch(`/order/${id}`, {
        event: "less",
      });
      if (response.data.status === "success") {
        orderCartRefetch();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleDeleteOrder = useMutation(async (id) => {
    try {
      const response = await API.delete(`/order/${id}`);
      if (response.data.status === "success") {
        orderCartRefetch();
      }
    } catch (e) {
      console.log(e);
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let total = orderCart?.reduce((sum, order) => {
      return sum + order.order_qty * order.product.price;
    }, 0);

    setTotal(total);
  });

  return (
    <main style={{ marginTop: 150 }}>
      <Container>
        <h1 className="display-4 fw-bold" style={{ color: "#613D2B" }}>
          My Cart
        </h1>
        <h3 style={{ color: "#613D2B" }} className="mt-3">
          Review Your Order
        </h3>
      </Container>
      <Container className="my-2">
        <Row>
          {orderCartIsLoading ? (
            <Col
              lg={8}
              className="d-flex flex-row justify-content-center align-items-center pt-5"
            >
              <Spinner
                animation="border"
                size="xl"
                style={{ color: "#613D2B" }}
              />
            </Col>
          ) : (
            <Col lg={8}>
              {orderCart?.map((order) => {
                return (
                  <div key={order.id}>
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
                          <Card.Img
                            src={order.product.image}
                            alt="Product"
                            fluid
                          />
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
                                {order.product.name}
                              </Card.Title>
                              <Card.Text
                                style={{ color: "#A46161" }}
                                className="p-0 m-0 mb-2 fs-5"
                              >
                                Rp {order.product.price.toLocaleString()},-
                              </Card.Text>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                              <div
                                id="qty"
                                className="d-flex justify-content-start align-items-center ms-2"
                              >
                                <FaMinus
                                  style={{
                                    color: "#613D2B",
                                    cursor: "pointer",
                                  }}
                                  className="fs-4"
                                  onClick={() => {
                                    order.order_qty > 1 &&
                                      handleLessQty.mutate(order.id);
                                  }}
                                />
                                <div
                                  className="px-4 mx-2 rounded-3 d-flex flex-row justify-content-center align-items-center fs-4"
                                  style={{ backgroundColor: "#F6E6DA" }}
                                >
                                  <p
                                    className="p-0 m-0"
                                    style={{ color: "#613D2B" }}
                                  >
                                    {order.order_qty}
                                  </p>
                                </div>
                                <FaPlus
                                  style={{
                                    color: "#613D2B",
                                    cursor: "pointer",
                                  }}
                                  className="fs-4"
                                  onClick={() => {
                                    handleAddQty.mutate(order.id);
                                  }}
                                />
                              </div>

                              <Card.Text
                                style={{ color: "#613D2B" }}
                                className="p-0 m-0 text-end"
                              >
                                <BsTrash
                                  className="me-2 fs-3"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleDeleteOrder.mutate(order.id);
                                  }}
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
                  </div>
                );
              })}
            </Col>
          )}

          <Col lg={4} className="pt-1">
            <hr
              style={{
                height: 2,
                backgroundColor: "black",
                border: "none",
                opacity: "100%",
              }}
            />
            {orderCart?.map((order) => {
              return (
                <div key={order.id} className="mb-3">
                  <p style={{ color: "#A46161" }} className="p-0 m-0 fw-bold">
                    {order.product.name}
                  </p>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <p style={{ color: "#A46161" }} className="p-0 m-0 fs-5">
                      Subtotal
                    </p>
                    <p style={{ color: "#A46161" }} className="p-0 m-0 fs-5">
                      Rp{" "}
                      {(order.order_qty * order.product.price).toLocaleString()}
                      ,-
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <p style={{ color: "#A46161" }} className="p-0 m-0 fs-5">
                      Qty
                    </p>
                    <p
                      style={{ color: "#A46161" }}
                      className="p-0 m-0 fs-5 me-2"
                    >
                      {order.order_qty}
                    </p>
                  </div>
                </div>
              );
            })}
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
                Rp {total?.toLocaleString()},-
              </p>
            </div>
            <div className="mt-5 w-100 d-flex flex-row justify-content-end">
              <Button
                className="w-50 text-white hoveredButton py-2"
                style={{
                  backgroundColor: "#613D2B",
                  border: "2px solid #613D2B",
                  fontWeight: "bold",
                }}
              >
                Pay
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Cart;
