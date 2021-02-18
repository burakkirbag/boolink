import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Input, Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RootState } from "../store";
import { addBookmark, setLoading } from "../store/actions/bookmark-actions";
import { IBookmark } from "../models/bookmark";
import { createGuid } from "../utils/random";

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

const AddBookmark: FC = () => {
  const { loading } = useSelector((state: RootState) => state.bookmark);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const validationRules = {
    name: [
      {
        required: true,
        message: "Lütfen yerimi adını girin.\n",
      },
    ],
    url: [
      {
        required: true,
        message: "Lütfen yerimi adresini girin.\n",
      },
      {
        validator: (_: any, value: string) => urlValidate(value),
      },
    ],
  };

  const urlValidate = (value: string) => {
    if (value) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );

      if (!pattern.test(value))
        return Promise.reject("Geçerli bir adres girmelisiniz.");
      else return Promise.resolve();
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = (data: IBookmark) => {
    dispatch(setLoading(true));
    dispatch(addBookmark({ id: createGuid(), name: data.name, url: data.url }));
    form.resetFields();
  };

  return (
    <Card>
      <Form {...layout.form} form={form} name="addBookmark" onFinish={onFinish}>
        <h2>Yerimi oluştur</h2>
        <Form.Item
          {...layout.item}
          name="name"
          label="Adı"
          rules={validationRules.name}
        >
          <Input type="text" placeholder="Yerimi adı" />
        </Form.Item>
        <Form.Item
          {...layout.item}
          name="url"
          label="Adresi"
          rules={validationRules.url}
        >
          <Input type="url" placeholder="Yerimi adresi" />
        </Form.Item>
        <Form.Item {...layout.tail}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            <PlusOutlined />
            Yerimi oluştur
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBookmark;
