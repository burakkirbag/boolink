import { ReadonlyRecord } from "./base";
import { Record } from "immutable";

export interface IBaseBookmark {
  id?: string;
  name: string;
  url: string;
}

export interface IBookmark extends IBaseBookmark {}

export interface ReadonlyBookmark extends IBaseBookmark {}

export type Bookmark = ReadonlyRecord<ReadonlyBookmark>;

export const BookmarkFactory = Record<ReadonlyBookmark>({
  id: "",
  name: "",
  url: "",
});

export const BookmarkFactoryFromJs = (data: IBookmark) => {
  return BookmarkFactory({
    id: data.id,
    name: data.name,
    url: data.url,
  });
};
