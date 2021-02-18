import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Home: FC = () => {
  return (
    <div className="home">
      <h1>BooLink.</h1>

      <h2>Yerimlerinizi daha kolay yönetin</h2>
      <p>
        BooLink, linklerinizi kolay bir şekilde saklamınızı ve istediğiniz
        heryerden ulaşabilmenizi sağlar.
      </p>
      <div className="buttons">
        <Link to="login">
          <Button type="primary" size="large">
            Yerimlerinizi yönetmek için giriş yapın
          </Button>
        </Link>
        <Link to="register">
          <Button type="ghost" size="large">
            Yeni bir hesap oluşturun
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
