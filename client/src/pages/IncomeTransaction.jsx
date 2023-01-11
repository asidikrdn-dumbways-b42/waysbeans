import { Container, Table } from "react-bootstrap";

const IncomeTransaction = () => {
  return (
    <main style={{ marginTop: 150 }}>
      <h1
        className="display-6 fw-bold"
        style={{ color: "#613D2B", padding: "0 150px" }}
      >
        Income Transaction
      </h1>
      <Container>
        <Table
          bordered
          className="mt-5"
          style={{ border: "1px solid #8E8E8E" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#E5E5E5" }}>
              <th className="py-3 text-start">No</th>
              <th className="py-3 text-center">Name</th>
              <th className="py-3 text-center">Address</th>
              <th className="py-3 text-center">Post Code</th>
              <th className="py-3 text-center">Products Order</th>
              <th className="py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="text-center">Ahmad</td>
              <td className="text-center">Pasir Kuda, Kota Bogor</td>
              <td className="text-center">16119</td>
              <td className="text-center">RWANDA Beans</td>
              <td className="text-center" style={{ color: "orange" }}>
                Waiting Approve
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td className="text-center">Sidik</td>
              <td className="text-center">Pasir Kuda, Kota Bogor</td>
              <td className="text-center">16119</td>
              <td className="text-center">RWANDA Beans</td>
              <td className="text-center" style={{ color: "green" }}>
                Success
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td className="text-center">Rudini</td>
              <td className="text-center">Pasir Kuda, Kota Bogor</td>
              <td className="text-center">16119</td>
              <td className="text-center">RWANDA Beans</td>
              <td className="text-center" style={{ color: "red" }}>
                Cancel
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default IncomeTransaction;
