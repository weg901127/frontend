import React, { useState } from "react";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import BookSearchInNaverAPI from "../utils/BookSearchInNaverAPI";
import Book from "../../img/admin_icon.svg";
import IMGERR from "../../img/image_onerror.svg";
import SearchIcon from "../../img/search_icon.svg";
import "../../css/AddBook.css";

const AddBookSearch = () => {
  const [bookInfo, setBookInfo] = useState({
    isbn: "",
    title: "결과 없음",
    author: "",
    publisher: "",
    img: "",
    date: "",
  });

  const { isbn, title, author, publisher, img, date } = bookInfo;

  const onChange = e => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };

  const searchIsbn = e => {
    e.preventDefault();
    const data = BookSearchInNaverAPI("d_isbn", isbn);
    data.then(v => {
      setBookInfo({
        ...bookInfo,
        title: v ? v[0].elements[0].text : "결과 없음",
        img: v ? v[2].elements[0].text.replace(/type=m1/g, "") : "",
        author: v ? v[3].elements[0].text : "",
        publisher: v ? v[6].elements[0].text : "",
        date: v ? v[7].elements[0].text : "",
      });
    });
  };

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  return (
    <>
      <div className="inquire-box-wrapper">
        <InquireBoxTitle Icon={Book} titleKO="도서 정보" titleEN="Book info" />
        <div className="rent__inquire-box-user">
          <section className="add-book__body">
            <div className="add-book__content">
              <div className="add-book__photo">
                <img src={img} alt="bookThumbnail" onError={subtituteImg} />
              </div>
              <div className="add-book__info">
                <div className="add-book__info__search-wrap">
                  <span className="font-16 color-red">ISBN</span>
                  <form className="add-book__search-form" onSubmit={searchIsbn}>
                    <input
                      required
                      type="text"
                      name="isbn"
                      autoComplete="on"
                      value={isbn}
                      onChange={onChange}
                    />
                    <button className="search-button" type="submit">
                      <img
                        className="search-icon"
                        src={SearchIcon}
                        alt="search"
                      />
                    </button>
                  </form>
                </div>
                <div className="add-book__info__title">
                  <span className="font-16 color-red">ISBN 도서정보</span>
                  <div className="add-book__info__title-txt">{title}</div>
                </div>
                <div className="add-book__info__detail">
                  <p>
                    <span className="add-book__detail__key-txt">저자</span>
                    <span className="add-book__detail__key-txt">출판사</span>
                    <span className="add-book__detail__key-txt">발행연도</span>
                  </p>
                  <p>
                    <span className="add-book__detail__value-txt">
                      {author}
                    </span>
                    <span className="add-book__detail__value-txt">
                      {publisher}
                    </span>
                    <span className="add-book__detail__value-txt">{date}</span>
                  </p>
                </div>
                <div className="bookState">
                  <span className="font-16 color-red">
                    이미 등록된 도서 관리 정보
                  </span>
                  <div className="add-book__info__detail">
                    <p>
                      <span className="add-book__detail__key-txt">123</span>
                      <span className="add-book__detail__key-txt">124</span>
                    </p>
                    <p>
                      <span className="add-book__detail__value-txt">
                        컴퓨터/IT
                      </span>
                      <span className="add-book__detail__value-txt">
                        컴퓨터/IT
                      </span>
                    </p>
                    <p>
                      <span className="add-book__detail__value-txt">
                        I22.20.v1.c1
                      </span>
                      <span className="add-book__detail__value-txt">
                        I22.20.v1.c2
                      </span>
                    </p>
                  </div>
                </div>
                <div className="add-book__info__etc">
                  <p className="font-16 color-red">신규 등록 도서 관리 정보</p>
                  <select
                    className="add-book__info__etc__category"
                    name="category"
                  >
                    <option>컴퓨터/IT</option>
                    <option>데이터 분석/AI/ML</option>
                    <option>test3</option>
                  </select>
                  <input className="add-book__info__etc__input" type="text" />
                </div>
                <div className="add-book__info__etc">
                  <p className="font-16 color-red">기부자 정보</p>
                  <input className="add-book__info__etc__input" type="text" />
                </div>
                <div className="add-book__button font-20 color-ff">등록</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddBookSearch;
