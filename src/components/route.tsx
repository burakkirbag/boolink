import React, { FC } from "react";
import { Switch, Route as ReactRoute, Redirect } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Bookmarks from "../pages/bookmark";
import About from "../pages/about";

interface Props {
  isAuthenticated: boolean;
}

const routes = [
  {
    pathname: ["/", "/home", "/anasayfa"],
    exact: true,
    component: Home,
    viewAlways: true,
    isAuthenticated: false,
  },
  {
    pathname: ["/about", "/hakkimizda"],
    exact: true,
    component: About,
    viewAlways: true,
    isAuthenticated: false,
  },
  {
    pathname: ["/login", "/sign-in", "/giris-yap"],
    exact: true,
    component: Login,
    viewAlways: false,
    isAuthenticated: false,
  },
  {
    pathname: ["/register", "/sign-up", "/kayit-ol"],
    exact: true,
    component: Register,
    viewAlways: false,
    isAuthenticated: false,
  },
  {
    pathname: ["/bookmarks", "/yer-imleri"],
    exact: true,
    component: Bookmarks,
    viewAlways: false,
    isAuthenticated: true,
  },
  {
    pathname: ["/logout", "/sign-out", "/cikis-yap"],
    exact: true,
    component: Login,
    viewAlways: false,
    isAuthenticated: true,
  },
];

const Route: FC<Props> = (props: Props) => {
  return (
    <Switch>
      {routes.map((item: any, key: any) => {
        if (item.viewAlways || item.isAuthenticated == props.isAuthenticated) {
          return (
            <ReactRoute
              key={key}
              exact={item.exact}
              path={item.pathname}
              component={item.component}
            />
          );
        }
      })}
      {props.isAuthenticated ? (
        <Redirect to="bookmarks" />
      ) : (
        <Redirect to="login" />
      )}
    </Switch>
  );
};

export default Route;
