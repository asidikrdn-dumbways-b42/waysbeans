import { Button, Container, Table } from "react-bootstrap";

const ProductList = () => {
  return (
    <main style={{ marginTop: 150 }}>
      <Container fluid style={{ padding: "0 150px" }}>
        <h1 className="display-6 fw-bold" style={{ color: "#613D2B" }}>
          List Product
        </h1>
        <Table
          bordered
          className="mt-5"
          style={{ border: "1px solid #8E8E8E" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#E5E5E5" }}>
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
            <tr>
              <td>1</td>
              <td className="text-center">Lihat Gambar</td>
              <td className="text-center">RWANDA Beans</td>
              <td className={"text-center"}>150</td>
              <td className={"text-center"}>Rp 60.900,-</td>
              <td className={"text-center"}>Ini deskripsi.....</td>
              <td className="text-center">
                <Button variant="danger" className="py-1 px-4 mx-2">
                  Delete
                </Button>
                <Button variant="success" className="py-1 px-4 mx-2">
                  Update
                </Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td className="text-center">Lihat Gambar</td>
              <td className="text-center">RWANDA Beans</td>
              <td className={"text-center"}>150</td>
              <td className={"text-center"}>Rp 60.900,-</td>
              <td className={"text-center"}>Ini deskripsi.....</td>
              <td className="text-center">
                <Button variant="danger" className="py-1 px-4 mx-2">
                  Delete
                </Button>
                <Button variant="success" className="py-1 px-4 mx-2">
                  Update
                </Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td className="text-center">Lihat Gambar</td>
              <td className="text-center">RWANDA Beans</td>
              <td className={"text-center"}>150</td>
              <td className={"text-center"}>Rp 60.900,-</td>
              <td className={"text-center"}>Ini deskripsi.....</td>
              <td className="text-center">
                <Button variant="danger" className="py-1 px-4 mx-2">
                  Delete
                </Button>
                <Button variant="success" className="py-1 px-4 mx-2">
                  Update
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default ProductList;
