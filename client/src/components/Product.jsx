import { Button, Image, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Product = ({
  index,
  product,
  setCurrentProductData,
  setShowUpdateProductModal,
  productDataRefetch,
}) => {
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
    <tr>
      <td className="text-center" valign="middle">
        {index + 1}
      </td>
      <td className="text-center" valign="middle">
        <Image src={product.image} alt={product.name} />
      </td>
      <td className="text-center" valign="middle">
        <h3>{product.name}</h3>
      </td>
      <td className={"text-center"} valign="middle">
        <h5>{product.stock} pcs</h5>
      </td>
      <td className={"text-center"} valign="middle">
        <h5>Rp {product.price.toLocaleString()},-</h5>
      </td>
      <td className={"text-center"} valign="middle">
        <p style={{ textAlign: "justify" }}>{product.description}</p>
      </td>
      <td className="text-center" valign="middle">
        {handleDeleteProduct.isLoading ? (
          <Button
            variant="danger"
            className="py-1 px-4 mx-2"
            onClick={() => {
              handleDeleteProduct.mutate(product.id);
            }}
            disabled
          >
            <Spinner animation="border" variant="light" size="sm" />
          </Button>
        ) : (
          <Button
            variant="danger"
            className="py-1 px-4 mx-2"
            onClick={() => {
              handleDeleteProduct.mutate(product.id);
            }}
          >
            Delete
          </Button>
        )}

        <Button
          variant="success"
          className="py-1 px-4 mx-2"
          onClick={() => {
            setCurrentProductData(product);
            setShowUpdateProductModal(true);
          }}
        >
          Update
        </Button>
      </td>
    </tr>
  );
};

export default Product;
