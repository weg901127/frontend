import React from "react";
import Banner from "../utils/Banner";
import "../../css/ReturnBook.css";
import AddBookSearch from "./AddBookSearch";
import AdminTabs from "../utils/AdminTabs";

const AddBook = () => {
  return (
    <main>
      <Banner img="admin" titleKo="도서 등록" titleEn="ADD BOOK" />
      <AdminTabs />
      <AddBookSearch />
    </main>
  );
};

export default AddBook;
