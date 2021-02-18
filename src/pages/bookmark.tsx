import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, List, Alert } from "antd";
import { RootState } from "../store";
import { AddBookmark, BookmarkListItem } from "../components";
import { IBookmark } from "../models/bookmark";

const Bookmarks: FC = () => {
  let { items } = useSelector((state: RootState) => state.bookmark);
  let [bookmarks, setBookmarks] = useState<IBookmark[]>([]);

  useEffect(() => {
    if (items.count() > 0) {
      setBookmarks(items.toJS());
    } else {
      setBookmarks([]);
    }
  }, [items]);

  return (
    <div className="bookmarks">
      <div className="content">
        <h1>Yerimleri</h1>
        <AddBookmark />
        <Card>
          <h2>Yerimleriniz</h2>
          {bookmarks.length > 0 ? (
            <List itemLayout="horizontal">
              {bookmarks.map((bookmark: IBookmark, key: any) => {
                return (
                  <BookmarkListItem
                    key={key}
                    id={bookmark.id}
                    name={bookmark.name}
                    url={bookmark.url}
                  />
                );
              })}
            </List>
          ) : (
            <Alert
              message="Yerimi bulunamadı"
              description="Henüz bir yerimi eklemediniz."
              type="info"
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Bookmarks;
