import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Card, Form, Button, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { IRegister } from "../models/auth";

const layout = {
  form: {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  },
  item: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  },
  tail: {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 6,
      },
    },
  },
};

const Login: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const validationRules = {
    name: [
      {
        required: true,
        message: "Lütfen adınızı girin.\n",
      },
    ],
    username: [
      {
        required: true,
        message: "Lütfen kullanıcı adınızı girin.\n",
      },
    ],
    password: [
      { required: true, message: "Lütfen şifrenizi girin.\n" },
      {
        min: 8,
        message: "Şifreniz minimum 8 karakter uzunluğunda olmalıdır.\n",
      },
      {
        pattern: /[a-zA-Z]/,
        message: "Şifreniz en az bir harf içermelidir.\n",
      },
      {
        pattern: /\d/,
        message: "Şifreniz en az bir rakam içermelidir.\n",
      },
      {
        pattern: /[\W_]/,
        message: "Şifreniz en az bir sembol içermelidir.\n",
      },
      {
        pattern: /^\S+$/,
        message: "Şifreniz boşluk içermemelidir.\n",
      },
    ],
    passwordConfirmation: [
      {
        required: true,
        message: "Lütfen şifrenizi tekrar girin.\n",
      },
      {
        validator: (_: any, value: string) => compareToFirstPassword(value),
      },
    ],
  };

  const compareToFirstPassword = (value: string) => {
    if (value && value !== form.getFieldValue("password")) {
      return Promise.reject("Girdiğiniz şifreler uyuşmuyor.");
    } else {
      return Promise.resolve();
    }
  };

  const doRegister = (data: IRegister) => {
    setLoading(true);
    history.push("/login?registerSuccess=1");
  };

  return (
    <div className="register">
      <Card>
        <Form
          {...layout.form}
          form={form}
          name="register"
          onFinish={doRegister}
        >
          <h1>Hesabınızı oluşturun</h1>
          <Form.Item
            {...layout.item}
            name="name"
            label="Ad"
            rules={validationRules.name}
          >
            <Input type="text" placeholder="Adınız" />
          </Form.Item>
          <Form.Item
            {...layout.item}
            name="username"
            label="Kullanıcı adı"
            rules={validationRules.username}
          >
            <Input type="text" placeholder="Kullanıcı adınız" />
          </Form.Item>
          <Form.Item
            {...layout.item}
            label="Şifre"
            name="password"
            rules={validationRules.password}
          >
            <Input type="password" placeholder="Şifreniz" />
          </Form.Item>
          <Form.Item
            {...layout.item}
            label="Şifre Doğrulama"
            name="passwordconfirmation"
            rules={validationRules.passwordConfirmation}
          >
            <Input type="password" placeholder="Şifreniz tekrar" />
          </Form.Item>
          <Form.Item {...layout.tail}>
            <Button type="primary" htmlType="submit" loading={loading}>
              <UserAddOutlined />
              Kayıt ol
            </Button>
            <div className="mt-5">
              Zaten bir hesabınız var mı? <Link to="login">Giriş yap</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
