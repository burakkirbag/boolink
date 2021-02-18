import React, { FC, memo } from "react";
import { Layout } from "antd";

const Footer: FC = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      BookLink ©2021 Burak Kırbağ
    </Layout.Footer>
  );
};

export default memo(Footer);
