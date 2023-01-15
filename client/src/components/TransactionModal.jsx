import { QRCodeSVG } from "qrcode.react";
import { Alert, Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { API } from "../config/api";

const TransactionModals = ({
  showTransactionModals,
  setShowTransactionModals,
  currentTransactionData,
  transactionDataRefetch,
}) => {
  const handlePayTransaction = useMutation(() => {
    window.snap.pay(currentTransactionData.midtrans_id, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        transactionDataRefetch();
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        transactionDataRefetch();
      },
      onError: function (result) {
        /* You may add your own implementation here */
        transactionDataRefetch();
      },
      onClose: function () {
        /* You may add your own implementation here */
        Swal.fire({
          icon: "warning",
          text: "you closed the popup without finishing the payment",
        });
        transactionDataRefetch();
      },
    });
  });

  const handleReceivePackage = useMutation(async (id) => {
    try {
      const body = {
        status: "done",
      };
      const response = await API.patch(`/transaction/${id}`, body);
      console.log(response);
      if (response.data.status === "success") {
        transactionDataRefetch();
        Swal.fire({
          icon: "success",
          title: "Package Received",
        });
      }
    } catch (err) {}
  });

  // snap midtrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    // menambahkan scriptTag ke akhir body
    document.body.appendChild(scriptTag);

    // menghapus scriptTag saat element akan di unmount
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Modal
      show={showTransactionModals}
      centered
      onHide={() => {
        setShowTransactionModals(false);
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
      dialogClassName="transactionmodals"
    >
      <Card
        style={{
          border: "none",
          backgroundColor: "#F6E6DA",
        }}
        className="p-4 rounded-3"
      >
        <Row>
          <Col
            lg={9}
            className="d-flex flex-column align-items-start justify-content-center"
          >
            {currentTransactionData?.products?.map((product, i) => {
              return (
                <Row key={i}>
                  <Col lg={3}>
                    <Image
                      src={product.image}
                      alt="Product"
                      className="py-2"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col lg={9} className="px-lg-0">
                    <Card.Body className="px-0 py-2">
                      <Card.Title
                        className="fw-bold mb-2 fs-6"
                        style={{ color: "#613D2B" }}
                      >
                        {product.name}
                      </Card.Title>
                      <Card.Subtitle style={{ color: "#613D2B", fontSize: 12 }}>
                        {currentTransactionData?.order_date}
                      </Card.Subtitle>
                      <Card.Text
                        style={{ color: "#A46161", fontSize: 12 }}
                        className="p-0 m-0 mt-3"
                      >
                        Price : Rp {product.price.toLocaleString()}
                        ,-
                      </Card.Text>
                      <Card.Text
                        style={{ color: "#A46161", fontSize: 12 }}
                        className="p-0 m-0"
                      >
                        Qty : {product.orderQty}
                      </Card.Text>
                      <Card.Text
                        style={{ color: "#A46161", fontSize: 12 }}
                        className="p-0 m-0 mb-3 fw-bold"
                      >
                        Sub Total : Rp{" "}
                        {(product.orderQty * product.price).toLocaleString()}
                        ,-
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col
            lg={3}
            className="d-flex flex-column align-items-center justify-content-center p-0"
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center px-1">
              <Image
                src="/assets/NavbarIcon.svg"
                alt="WaysBeans"
                fluid
                width={"75%"}
              />
              <QRCodeSVG
                value={"transaction_id"}
                bgColor={"#F6E6DA"}
                size={70}
                className="my-3"
              />
              {currentTransactionData?.status === "new" && (
                <Alert
                  variant="danger"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  Waiting Payment
                </Alert>
              )}
              {currentTransactionData?.status === "pending" && (
                <Alert
                  variant="danger"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  Waiting Payment
                </Alert>
              )}
              {currentTransactionData?.status === "failed" && (
                <Alert
                  variant="danger"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  Payment failed
                </Alert>
              )}
              {currentTransactionData?.status === "reject" && (
                <Alert
                  variant="danger"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  Transaction rejected by Admin, please contact Admin for a
                  refund
                </Alert>
              )}
              {currentTransactionData?.status === "success" && (
                <Alert
                  variant="success"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  Payment success, waiting approve from admin
                </Alert>
              )}
              {currentTransactionData?.status === "approved" && (
                <Alert
                  variant="success"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  On Process
                </Alert>
              )}
              {currentTransactionData?.status === "sent" && (
                <Alert
                  variant="success"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  On The Way
                </Alert>
              )}
              {currentTransactionData?.status === "done" && (
                <Alert
                  variant="success"
                  className="d-inline-block text-center p-1 w-100 mb-0"
                  style={{ fontSize: 12 }}
                >
                  Package Received
                </Alert>
              )}

              <Card.Text
                style={{ color: "#A46161", fontSize: 14 }}
                className="p-0 m-0 mt-2 fw-bold"
              >
                Total : Rp {currentTransactionData?.total?.toLocaleString()}
                ,-
              </Card.Text>
            </Card.Body>
            {currentTransactionData?.status === "new" && (
              <Button
                className="w-50 text-white hoveredButton py-2"
                style={{
                  backgroundColor: "#613D2B",
                  border: "2px solid #613D2B",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  handlePayTransaction.mutate();
                  setShowTransactionModals(false);
                }}
              >
                PAY
              </Button>
            )}
            {currentTransactionData?.status === "pending" && (
              <Button
                className="w-100 text-white hoveredButton py-2"
                style={{
                  backgroundColor: "#613D2B",
                  border: "2px solid #613D2B",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  handlePayTransaction.mutate();
                  setShowTransactionModals(false);
                }}
              >
                CONTINUE PENDING PAYMENT
              </Button>
            )}
            {currentTransactionData?.status === "sent" && (
              <Button
                className="w-75 text-white hoveredButton py-2"
                style={{
                  backgroundColor: "#613D2B",
                  border: "2px solid #613D2B",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  handleReceivePackage.mutate(currentTransactionData.id);
                  setShowTransactionModals(false);
                }}
              >
                Receive Package
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default TransactionModals;
