import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/actions/rootAction";
import '../resources/authentication.css'
import {
  Button,
  Form,
  Modal,
  message,
  Table,
  Input,
  Select,
  Col,
  Row,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values) => {
        dispatch(showLoading())
        axios.post('/api/users/login', values)
            .then((res)=>{
                dispatch(hideLoading())
                message.success("Login Successfull")
                localStorage.setItem("pos-user",JSON.stringify(res.data))
                navigate('/home')
            })
            .catch((err)=>{
                dispatch(hideLoading())
                message.error("Something Went Wrong")
            })
      };
      useEffect(()=>{
        if(localStorage.getItem('pos-user')){
        navigate('/home')
        }
      },[])

  return (
    <div className="authentication">
      <Row>
        <Col lg={10} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
          <h1 className="text-center" style={{color:"rgb(17,2,71)"}}><b>POS APP</b></h1>
          <hr/>
          <h3 className="text-center" style={{color: "rgb(56, 50, 26)"}}>Login</h3>
            <Form.Item
              name="userId"
              label="User ID"
              rules={[
                {
                  required: true,
                  message: "Please enter the User ID!",
                },
              ]}
            >
              <Input className="input" />
            </Form.Item>
            <Form.Item
              name="password"
              label="password"
              rules={[
                {
                  required: true,
                  message: "Please enter the password",
                },
                {
                  min: 6,
                  message: "minimum 6 character required",
                },
                {
                  max: 12,
                  message: "maximum 12 character required",
                },

              ]}
            >
              <Input className="input" type="password"/>
            </Form.Item>

            <div className="text-center">
              <Button htmlType="submit" type="primary">
                LOGIN
              </Button>
              <br/>
              <Link to="/register">Don't Have An Account ? Click Here To Register</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
