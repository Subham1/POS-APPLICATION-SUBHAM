import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Form, message, Input, Select } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  deleteCartItem,
  updateCartByDec,
  updateCartByInc,
} from "../redux/actions/rootAction";
import Item from "antd/lib/list/Item";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CartPage = () => {

  const [subTotal, setSubTotal] = useState(0);
  const [billchargeModel, setBillChargeModel] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => {
    return state.rootReducer;
  });

  const increaseQuantity = (record) => {
    dispatch(updateCartByInc(record));
  };
  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch(updateCartByDec(record));
    }
  };
  const deleteItem = (record) => {
    dispatch(deleteCartItem(record));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
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
          <PlusCircleOutlined
            className="mx-3"
            onClick={() => {
              increaseQuantity(record);
            }}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => {
              decreaseQuantity(record);
            }}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          onClick={() => {
            deleteItem(record);
          }}
        />
      ),
    },
  ];
  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum = sum + item.price * item.quantity;
    });
    setSubTotal(sum);
  }, [cartItems]);

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(
        subTotal + Number(((subTotal / 100) * 10).toFixed(2))
      ),
    };
    axios
      .post("/api/bills/charge-bill", reqObject)
      .then((res) => {
        message.success("Bill Charged Successfully");
        navigate('/bills')
      })
      .catch((err) => {
        message.error("Something Went Wrong");
      });
  };
  return (
    <div>
      <DefaultLayout>
        <h3>Cart</h3>
        <Table columns={columns} dataSource={cartItems} bordered />
        <hr />
        <div className="d-flex justify-content-end flex-column align-items-end">
          <div className="subtotal">
            <h3>
              <b>SUB TOTAL : {subTotal}$/-</b>
            </h3>
          </div>

          <Button
            type="primary"
            onClick={() => {
              setBillChargeModel(true);
            }}
          >
            GENERATE BILL
          </Button>
        </div>
        <Modal
          title="Charge Bill"
          visible={billchargeModel}
          footer={false}
          onCancel={() => {
            setBillChargeModel(false);
          }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer name!",
                },
                {
                  min: 3,
                  message: "minimum 3 character required",
                },
              ]}
            >
              <Input className="input" />
            </Form.Item>
            <Form.Item
              name="customerPhoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please enter the phone number!",
                },
              ]}
            >
              <Input className="input" />
            </Form.Item>

            <Form.Item
              name="paymentMode"
              label="Payment Mode"
              rules={[
                {
                  required: true,
                  message: "Please select the category",
                },
              ]}
            >
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
              </Select>
            </Form.Item>
            <div className="charge-bill-amount">
              <h5>
                SubTotal : <b>{subTotal}</b>
              </h5>
              <h5>
                Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b>
              </h5>
              <hr />
              <h2>
                Grand Total : <b>{subTotal + (subTotal / 100) * 10}</b>
              </h2>
            </div>
            <div className="text-center">
              <Button htmlType="submit" type="primary">
                GENERATE BILL
              </Button>
            </div>
          </Form>
        </Modal>
      </DefaultLayout>
    </div>
  );
};

export default CartPage;
