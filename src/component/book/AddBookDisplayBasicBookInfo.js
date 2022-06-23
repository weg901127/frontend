import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const labelText = {
  author: "저 자",
  publisher: "출판사",
  pubdate: "출판일",
};

const DisplayBasicBookInfo = ({ isConfirmedInfo, bookBasicInfo }) => {
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState({
    ...bookBasicInfo,
  });
  useEffect(() => {
    setUserInput({
      ...bookBasicInfo,
    });
  }, [bookBasicInfo]);

  const onChangeInput = e => {
    const { id, value } = e.currentTarget;
    if (id === "pubdate") {
      const isValidDate = RegExp(/^[0-9]{8}$/).test(value);
      const currentMessage = !isValidDate
        ? `날짜는 yyyymmdd 형식을 지켜주세요 ex.19450815`
        : "";
      if (message !== currentMessage) setMessage(currentMessage);
    }
    setUserInput({
      ...userInput,
      [id]: value,
    });
  };

  const useInput = key => {
    return (
      <label htmlFor={key} className="add-book__book-info__text">
        <span className="font-16-bold add-book__book-info__text-key">
          {labelText[key]}
        </span>
        <input
          className="add-book__basic-info__input "
          type="text"
          id={key}
          value={userInput[key]}
          onChange={onChangeInput}
          readOnly={isConfirmedInfo}
          required
        />
      </label>
    );
  };
  return (
    <>
      <p className="color-red add-book__overlined ">ISBN 도서정보</p>
      <label htmlFor="title" className=" add-book__underlined">
        <input
          className="add-book__basic-info__input font-28-bold"
          type="text"
          id="title"
          readOnly={isConfirmedInfo}
          value={userInput.title}
          onChange={onChangeInput}
        />
      </label>
      {useInput("author")}
      {useInput("publisher")}
      {useInput("pubdate")}
      {message && <p>{message}</p>}
    </>
  );
};

export default DisplayBasicBookInfo;

DisplayBasicBookInfo.propTypes = {
  isConfirmedInfo: PropTypes.bool.isRequired,
  bookBasicInfo: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    pubdate: PropTypes.string.isRequired,
  }).isRequired,
};
