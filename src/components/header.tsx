import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Layout, Row, Col, Menu } from "antd";
import { logout } from "../store/actions/auth-actions";

interface Props {
  isAuthenticated: boolean;
}

const menu = [
  {
    key: "about",
    text: "Hakkımızda",
    path: "about",
    viewAlways: true,
    requireAuth: false,
  },
  {
    key: "login",
    text: "Giriş yap",
    path: "login",
    viewAlways: false,
    requireAuth: false,
  },
  {
    key: "register",
    text: "Kayıt ol",
    path: "register",
    viewAlways: false,
    requireAuth: false,
  },
  {
    key: "bookmarks",
    text: "Yerimlerim",
    path: "bookmarks",
    viewAlways: false,
    requireAuth: true,
  },
];

const Header: FC<Props> = (props: Props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getSelectedKeys = () => {
    return [location.pathname.replace("/", "")];
  };

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout.Header>
      <Row justify="space-between">
        <Col>
          <div className="logo">
            <Link to="home">BooLink.</Link>
          </div>
        </Col>
        <Col>
          <Menu
            mode="horizontal"
            className="header-menu"
            selectedKeys={getSelectedKeys()}
          >
            {menu.map((item) => {
              if (
                item.viewAlways ||
                item.requireAuth == props.isAuthenticated
              ) {
                return (
                  <Menu.Item key={item.key}>
                    <Link to={item.path}>{item.text}</Link>
                  </Menu.Item>
                );
              }
            })}
            {props.isAuthenticated && (
              <Menu.Item key="logout" onClick={doLogout}>
                Çıkış yap
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default memo(Header);
