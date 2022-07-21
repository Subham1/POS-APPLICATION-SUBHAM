import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/actions/rootAction";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCartItem } from "../redux/actions/rootAction";
import { Button, Form, Modal, message, Table, Input, Select } from "antd";

const Items = () => {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const dispatch = useDispatch();

  const getAllItems = () => {
    dispatch(showLoading());
    axios
      .get("/api/items/get-all-items")
      .then((res) => {
        dispatch(hideLoading());
        console.log(res.data);
        setItemsData(res.data);
      })
      .catch((err) => {
        dispatch(showLoading());
        console.log(err);
      });
  };
  const deleteItem = (record) => {
    dispatch(showLoading());
    axios
      .post("/api/items/delete-item" , {itemId : record._id})
      .then((response) => {
        dispatch(hideLoading());
        message.success('Item deleted successdully')
        getAllItems()
      })
      .catch((error) => {
        dispatch(hideLoading());
        message.error('Something went wrong')
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);
  // const deleteItem = (record) => {
  //   dispatch(deleteCartItem(record));
  // };
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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibility(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={()=>{
            deleteItem(record)
          }}/>
        </div>
      ),
    },
  ];
  const onFinish = (values) => {
    dispatch(showLoading());
    if(editingItem === null){
      axios
      .post("/api/items/add-item", values)
      .then((res) => {
        dispatch(hideLoading());
        message.success("Item added successfully");
        setAddEditModalVisibility(false);
        getAllItems();
      })
      .catch((err) => {
        dispatch(hideLoading());
        message.error("Something went wrong");
        console.log(err);
      });
    }else{
      axios
      .post("/api/items/edit-item", {...values , itemId : editingItem._id})
      .then((res) => {
        dispatch(hideLoading());
        message.success("Item edited successfully");
        setEditingItem(null)
        setAddEditModalVisibility(false);
        getAllItems();
      })
      .catch((err) => {
        dispatch(hideLoading());
        message.error("Something went wrong");
        console.log(err);
      });
    }
  };
  return (
    <div>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Items</h3>
          <Button
            type="primary"
            onClick={() => {
              setAddEditModalVisibility(true);
            }}
          >
            Add Item
          </Button>
        </div>
        <Table columns={columns} dataSource={itemsData} bordered />
        {addEditModalVisibility && (
          <Modal
            onCancel={() => {
              setEditingItem(null)
              setAddEditModalVisibility(false);
            }}
            visible={addEditModalVisibility}
            title={`${editingItem !== null ? 'Edit Item' : 'Add New Item'}`}
            footer={false}
          >
            <Form
              initialValues={editingItem}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the name!",
                  },
                  {
                    min: 4,
                    message: "minimum 4 character required",
                  },
                ]}
              >
                <Input className="input" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please enter the price!",
                  },
                ]}
              >
                <Input className="input" />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[
                  {
                    required: true,
                    message: "Please enter the image url!",
                  },
                ]}
              >
                <Input className="input" />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select the category",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="fruits">Fruits</Select.Option>
                  <Select.Option value="vegetables">Vegetables</Select.Option>
                  <Select.Option value="meat">Meat</Select.Option>
                </Select>
              </Form.Item>
              <div className="text-center">
                <Button htmlType="submit" type="primary">
                  SAVE
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </DefaultLayout>
    </div>
  );
};

export default Items;
