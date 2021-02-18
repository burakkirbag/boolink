import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { Button, List } from "antd";
import { removeBookmark, setLoading } from "../store/actions/bookmark-actions";
import { IBookmark } from "../models/bookmark";

const BookmarkListItem: FC<IBookmark> = (props: IBookmark) => {
  const { id, name, url } = props;

  const dispatch = useDispatch();

  const openHandled = (item: IBookmark) => {
    window.open(item.url, "_blank");
  };
  const removeHandled = (item: IBookmark) => {
    dispatch(setLoading(true));
    dispatch(removeBookmark(item));
  };

  return (
    <List.Item
      actions={[
        <Button
          type="dashed"
          key="bookmark-list-open"
          onClick={(e) => {
            openHandled(props);
          }}
        >
          ziyaret et
        </Button>,
        <Button
          type="dashed"
          color="red"
          key="{bookmark-list-remove}"
          onClick={(e) => {
            removeHandled(props);
          }}
        >
          sil
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={name}
        description={
          <a href={url} target="_blank">
            {url}
          </a>
        }
      />
    </List.Item>
  );
};

export default memo(BookmarkListItem);
