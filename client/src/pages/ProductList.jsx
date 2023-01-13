import { Button, Container, Table, Image } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

const ProductList = () => {
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

  const handleDeleteProduct = useMutation(async (id) => {
    try {
      const response = await API.delete(`/product/${id}`);
      if (response.data.status === "success") {
        productDataRefetch();
      }
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <main style={{ marginTop: 150 }}>
      <Container fluid style={{ padding: "0 150px" }}>
        <h1 className="display-6 fw-bold" style={{ color: "#613D2B" }}>
          List Product
        </h1>
        <Table
          bordered
          className="mt-5"
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
                <tr>
                  <td>{i + 1}</td>
                  <td className="text-center" valign="middle">
                    <Image src={product.image} alt={product.name} />
                  </td>
                  <td className="text-center" valign="middle">
                    <h3>{product.name}</h3>
                  </td>
                  <td className={"text-center"} valign="middle">
                    <h5>{product.stock}</h5>
                  </td>
                  <td className={"text-center"} valign="middle">
                    <h5>Rp {product.price.toLocaleString()},-</h5>
                  </td>
                  <td className={"text-center"} valign="middle">
                    <p style={{ textAlign: "justify" }}>
                      {product.description}
                    </p>
                  </td>
                  <td className="text-center" valign="middle">
                    <Button
                      variant="danger"
                      className="py-1 px-4 mx-2"
                      onClick={() => {
                        handleDeleteProduct.mutate(product.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button variant="success" className="py-1 px-4 mx-2">
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default ProductList;
