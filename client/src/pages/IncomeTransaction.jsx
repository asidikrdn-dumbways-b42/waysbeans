import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import AdminTransactionModals from "../components/AdminTransactionModals";
import { API } from "../config/api";

const IncomeTransaction = () => {
  const [showTransactionModals, setShowTransactionModals] = useState(false);
  const [currentTransactionData, setCurrentTransactionData] = useState({});

  const {
    data: allTransactionsData,
    // isLoading: allTransactionsDataIsLoading,
    refetch: allTransactionsDataRefetch,
  } = useQuery("allTransactionsDataCache", async () => {
    try {
      const response = await API.get("/transactions-admin");
      if (response.data.status === "success") {
        return response.data.data;
      }
    } catch (err) {}
  });

  const handleApproveTransactionStatus = useMutation(async (id) => {
    try {
      const body = {
        status: "approved",
      };
      const response = await API.patch(`/transaction/${id}`, body);
      console.log(response);
      if (response.data.status === "success") {
        allTransactionsDataRefetch();
        Swal.fire({
          icon: "success",
          title: "Transaction Approved",
        });
      }
    } catch (err) {}
  });

  const handleRejectTransactionStatus = useMutation(async (id) => {
    try {
      const body = {
        status: "rejected",
      };
      const response = await API.patch(`/transaction/${id}`, body);
      console.log(response);
      if (response.data.status === "success") {
        allTransactionsDataRefetch();
        Swal.fire({
          icon: "success",
          title: "Transaction Rejected",
        });
      }
    } catch (err) {}
  });

  const handleSendPackage = useMutation(async (id) => {
    try {
      const body = {
        status: "sent",
      };
      const response = await API.patch(`/transaction/${id}`, body);
      console.log(response);
      if (response.data.status === "success") {
        allTransactionsDataRefetch();
        Swal.fire({
          icon: "success",
          title: "Package Sent",
        });
      }
    } catch (err) {}
  });

  return (
    <main style={{ marginTop: 150 }}>
      <AdminTransactionModals
        showTransactionModals={showTransactionModals}
        setShowTransactionModals={setShowTransactionModals}
        currentTransactionData={currentTransactionData}
      />
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
              <th className="py-3 text-center" width="20%">
                Name
              </th>
              <th className="py-3 text-center" width="20%">
                Address
              </th>
              <th className="py-3 text-center">Post Code</th>
              <th className="py-3 text-center" width="20%">
                Products Order
              </th>
              <th className="py-3 text-center">
                Status
              </th>
              <th className="py-3 text-center" width="20%">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allTransactionsData?.map((trx, i) => {
              return (
                <tr key={i}>
                  <td valign="middle">{i + 1}</td>
                  <td className="text-center" valign="middle">
                    {trx.user.name}
                  </td>
                  <td className="text-center" valign="middle">
                    {trx.user.address}
                  </td>
                  <td className="text-center" valign="middle">
                    {trx.user.post_code}
                  </td>
                  <td className="text-center" valign="middle">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentTransactionData(trx);
                        setShowTransactionModals(true);
                      }}
                    >
                      {trx.products.map((product, i) => {
                        if (i + 1 !== trx.products.length) {
                          return (
                            <div className="d-inline" key={i}>
                              {product.name},{" "}
                            </div>
                          );
                        } else {
                          return (
                            <div className="d-inline" key={i}>
                              {product.name}
                            </div>
                          );
                        }
                      })}
                    </p>
                  </td>

                  {trx.status === "new" && (
                    <td
                      className="text-center"
                      style={{ color: "orange" }}
                      valign="middle"
                    >
                      Waiting Payment
                    </td>
                  )}
                  {trx.status === "pending" && (
                    <td
                      className="text-center"
                      style={{ color: "orange" }}
                      valign="middle"
                    >
                      Waiting Payment
                    </td>
                  )}
                  {trx.status === "failed" && (
                    <td
                      className="text-center"
                      style={{ color: "red" }}
                      valign="middle"
                    >
                      Payment Failed
                    </td>
                  )}
                  {trx.status === "rejected" && (
                    <td
                      className="text-center"
                      style={{ color: "red" }}
                      valign="middle"
                    >
                      Transaction Rejected
                    </td>
                  )}
                  {trx.status === "success" && (
                    <td
                      className="text-center"
                      style={{ color: "green" }}
                      valign="middle"
                    >
                      Payment Success, Waiting Approve
                    </td>
                  )}
                  {trx.status === "approved" && (
                    <td
                      className="text-center"
                      style={{ color: "green" }}
                      valign="middle"
                    >
                      On Process
                    </td>
                  )}
                  {trx.status === "sent" && (
                    <td
                      className="text-center"
                      style={{ color: "green" }}
                      valign="middle"
                    >
                      On The Way
                    </td>
                  )}
                  {trx.status === "done" && (
                    <td
                      className="text-center"
                      style={{ color: "green" }}
                      valign="middle"
                    >
                      Package Delivered
                    </td>
                  )}

                  <td className="text-center" valign="middle">
                    {trx.status === "success" && (
                      <>
                        <Button
                          variant="success"
                          className="py-1 px-4 mx-2"
                          onClick={() => {
                            handleApproveTransactionStatus.mutate(
                              trx.id,
                              "approved"
                            );
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          className="py-1 px-4 mx-2"
                          onClick={() => {
                            handleRejectTransactionStatus.mutate(
                              trx.id,
                              "reject"
                            );
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {trx.status === "approved" && (
                      <Button
                        variant="success"
                        className="py-1 px-4 mx-2"
                        onClick={() => {
                          handleSendPackage.mutate(trx.id);
                        }}
                      >
                        Send
                      </Button>
                    )}
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

export default IncomeTransaction;
