import React, { FC, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import { RootState } from "./store";
import { autoLogin } from "./store/actions/auth-actions";

import Route from "./components/route";
import Header from "./components/header";
import Footer from "./components/footer";

const { Content } = Layout;

const App: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setLogged] = useState<boolean>(false);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(autoLogin());
  }, []);

  useLayoutEffect(() => {
    setLogged(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div id="app">
      <BrowserRouter>
        <Layout>
          <Header isAuthenticated={isLoggedIn} />
          <Content>
            <Route isAuthenticated={isLoggedIn} />
          </Content>
          <Footer />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
