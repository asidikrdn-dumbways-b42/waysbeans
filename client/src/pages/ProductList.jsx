import { useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import Product from "../components/Product";
import UpdateProductModal from "../components/UpdateProductModal";
import { API } from "../config/api";

const ProductList = () => {
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [currentProductData, setCurrentProductData] = useState({});

  const {
    data: productData,
    isisLoading: productDataIsLoading,
    refetch: productDataRefetch,
  } = useQuery("productDataCache", async (e) => {
    try {
      const response = await API.get("/products");
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <main style={{ marginTop: 150 }}>
      <UpdateProductModal
        showUpdateProductModal={showUpdateProductModal}
        setShowUpdateProductModal={setShowUpdateProductModal}
        productDataRefetch={productDataRefetch}
        currentProductData={currentProductData}
      />
      {productDataIsLoading ? (
        <Container
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Spinner animation="border" size="xl" style={{ color: "#613D2B" }} />
        </Container>
      ) : (
        <Container fluid style={{ padding: "0 150px" }}>
          <h1 className="display-6 fw-bold" style={{ color: "#613D2B" }}>
            List Product
          </h1>
          <Table
            bordered
            className="my-5"
            // style={{ border: "1px solid #8E8E8E" }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#E5E5E5",
                  border: "1px solid #8E8E8E",
                }}
              >
                <th className="py-3 text-start">No</th>
                <th className="py-3 text-center">Image</th>
                <th className="py-3 text-center">Name</th>
                <th className="py-3 text-center" style={{ width: "10%" }}>
                  Stock
                </th>
                <th className="py-3 text-center" style={{ width: "10%" }}>
                  Price
                </th>
                <th className="py-3 text-center" style={{ width: "25%" }}>
                  Description
                </th>
                <th className="py-3 text-center" style={{ width: "20%" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productData?.map((product, i) => {
                return (
                  <Product
                    key={i}
                    index={i}
                    product={product}
                    productDataRefetch={productDataRefetch}
                    setCurrentProductData={setCurrentProductData}
                    setShowUpdateProductModal={setShowUpdateProductModal}
                  />
                );
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </main>
  );
};

export default ProductList;
