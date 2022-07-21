import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/actions/rootAction";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCartItem } from "../redux/actions/rootAction";
import { Button, Form, Modal, message, Table, Input, Select } from "antd";
import { useReactToPrint } from 'react-to-print';

const Bills = () => {
  const [billsData, setBillsData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibility] =
    useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const dispatch = useDispatch();

  const getAllBills = () => {
    dispatch(showLoading());
    axios
      .get("/api/bills/get-all-bills")
      .then((res) => {
        dispatch(hideLoading());
        // console.log(res.data);
        const data = res.data
        data.reverse()
        setBillsData(data);
      })
      .catch((err) => {
        dispatch(showLoading());
        console.log(err);
      });
  };
  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
        title: "Total fare",
        dataIndex: "_id",
        render: (id, record) => (
          <div>
            <b>{record.quantity * record.price}</b>
          </div>
        ),
      },
  ];

  useEffect(() => {
    getAllBills();
  }, []);
  // const deleteItem = (record) => {
  //   dispatch(deleteCartItem(record));
  // };
  const columns = [
    {
      title: "Bill_ID",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrintBillModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Bill Details</h3>
        </div>
        <Table columns={columns} dataSource={billsData} bordered />
        {printBillModalVisibility && (
          <Modal
            onCancel={() => {
              setPrintBillModalVisibility(false);
            }}
            visible={printBillModalVisibility}
            title="Bill Details"
            footer={false}
            width={600}
          >
            <div className="bill-model p-4" ref={componentRef}>
              <div className="d-flex justify-content-between bill-header ">
                <div>
                  <h1>
                    <b>TARATARINI STORE</b>
                  </h1>
                </div>
                <div>
                  <p>City - Kotpad</p>
                  <p>Pin - (764058)</p>
                  <p>Lane - Vivekananda Marg</p>
                  <p>Ph - 7684291260</p>
                </div>
              </div>
              <div className="bill-customer-details mt-2 pb-2">
                <p>
                  <b>Name - </b> : {selectedBill.customerName}
                </p>
                <p>
                  <b>Phone Number - </b> : {selectedBill.customerPhoneNumber}
                </p>
                <p>
                  <b>Date - </b> :{" "}
                  {selectedBill.createdAt.toString().slice(0, 10)}
                </p>
              </div>
              <Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false}/>
              <div className="dotted-border mt-2 pb-2">
                    <h6><b>SUB TOTAL - {selectedBill.subTotal}</b></h6>
                    <h6><b>TAX - {selectedBill.tax}</b></h6>
              </div>
              <div className="mt-2">
                <h2><b>GRAND TOTAL - {selectedBill.totalAmount}</b></h2>
              </div>
            <div className="dotted-border mt-2"></div>
              <div className="text-center">
                    <p>Thanks</p>
                    <p>Visit Again :)</p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="primary" onClick={handlePrint}>Print Bill</Button>
            </div>
          </Modal>
        )}
      </DefaultLayout>
    </div>
  );
};

export default Bills;
