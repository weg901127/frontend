/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import ArrRight from "../../img/arrow_right_black.svg";
import "../../css/Pagination.css";

const PageButton = ({ pageNum, userPage, setUserPage }) => {
  const changePage = () => {
    if (setUserPage) {
      setUserPage(pageNum);
    }
  };

  return (
    <button
      type="button"
      onClick={changePage}
      className={`page-button font-20 ${
        parseInt(userPage, 10) === pageNum ? "color-54" : "color-a4"
      }`}
    >
      {pageNum}
    </button>
  );
};

const PrePageButton = ({ pageRange, setPageRange }) => {
  const changePage = () => {
    if (pageRange > 0) {
      setPageRange(pageRange - 1);
    }
  };
  return (
    <button className="pre-page-button" type="button" onClick={changePage}>
      {pageRange > 0 ? (
        <img
          className="page-button-icon-reverse"
          src={ArrRight}
          alt="prePage"
        />
      ) : (
        <span className="page-button-icon" />
      )}
    </button>
  );
};

const NextPageButton = ({ pageRange, setPageRange, lastPage }) => {
  const changePage = () => {
    if ((pageRange + 1) * 5 < parseInt(lastPage, 10)) {
      setPageRange(pageRange + 1);
    }
  };
  return (
    <button className="next-page-button" type="button" onClick={changePage}>
      {(pageRange + 1) * 5 < parseInt(lastPage, 10) ? (
        <img className="page-button-icon" src={ArrRight} alt="nextPage" />
      ) : (
        <span className="page-button-icon" />
      )}
    </button>
  );
};

const Pagination = ({
  userPage,
  setUserPage,
  pageRange,
  setPageRange,
  lastPage,
}) => {
  const pageRangeArr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    if (pageRange * 5 + i <= lastPage) pageRangeArr.push(pageRange * 5 + i);
  }

  return (
    <div className="modal-pagination">
      <PrePageButton pageRange={pageRange} setPageRange={setPageRange} />
      {pageRangeArr.map(n => (
        <PageButton pageNum={n} userPage={userPage} setUserPage={setUserPage} />
      ))}
      <NextPageButton
        pageRange={pageRange}
        setPageRange={setPageRange}
        lastPage={lastPage}
      />
    </div>
  );
};

export default Pagination;

PageButton.propTypes = {
  setUserPage: PropTypes.func.isRequired,
};
