import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card, Form, Button, Input, Alert } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { RootState } from "../store";
import { ILogin } from "../models/auth";
import { login, setLoading } from "../store/actions/auth-actions";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Login: FC = () => {
  const { loading, isAuthenticated, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const [backendError, setBackendError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const validationRules = {
    username: [
      {
        required: true,
        message: "Lütfen kullanıcı adınızı girin.\n",
      },
    ],
    password: [
      {
        required: true,
        message: "Lütfen şifrenizi girin.\n",
      },
    ],
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/bookmarks");
      form.resetFields();
    }
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    setBackendError(errorMessage);
  }, [errorMessage]);

  const doLogin = (data: ILogin) => {
    dispatch(setLoading(true));
    dispatch(login({ username: data.username, password: data.password }));
  };
  return (
    <div className="login">
      <Card>
        <Form {...layout.form} form={form} name="login" onFinish={doLogin}>
          <h1>Hesabınıza giriş yapın</h1>
          {query.get("registerSuccess") && query.get("registerSuccess") == "1" && (
            <Form.Item name="registerSuccess">
              <Alert
                message={"Hesabınız oluşturuldu !"}
                description={"Oturm açmak için kimlik bilgilerinizi kullanın."}
                type="success"
              />
            </Form.Item>
          )}
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
          {backendError && (
            <Form.Item {...layout.tail} name="backendError">
              <Alert message={backendError} type="error" />
            </Form.Item>
          )}
          <Form.Item {...layout.tail}>
            <Button type="primary" htmlType="submit" loading={loading}>
              <LoginOutlined />
              Giriş yap
            </Button>
            <div className="mt-5">
              Henüz bir hesabınız yok mu? <Link to="register">Kayıt ol</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
