import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/actions/rootAction";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCartItem } from "../redux/actions/rootAction";
import { Button, Form, Modal, message, Table, Input, Select } from "antd";
import { useReactToPrint } from 'react-to-print';

const Customers = () => {
  const [billsData, setBillsData] = useState([]);


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
  

  useEffect(() => {
    getAllBills();
  }, []);
  // const deleteItem = (record) => {
  //   dispatch(deleteCartItem(record));
  // };
  const columns = [
    
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render : (value) => <span>{value.toString().slice(0,10)}</span>
    },
    
  ];

 

  return (
    <div>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Customers</h3>
        </div>
        <Table columns={columns} dataSource={billsData} bordered />
        
      </DefaultLayout>
    </div>
  );
};

export default Customers;
