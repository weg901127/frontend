import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import axios from "axios";
import AdminSearchBar from "../utils/AdminSearchBar";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import AdminPagination from "../utils/AdminPagination";
import RentUserList from "./RentModalUserList";
import "../../css/RentModalUser.css";

const RentModalUser = ({ setSelectedUser, closeMidModal }) => {
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [userSearchPage, setUserSearchPage] = useState(1);
  const [userSearchPageRange, setUserSearchPageRange] = useState(0);
  const [lastUserSearchPage, setLastUserSearchPage] = useState(1);
  const [userList, setUserList] = useState([]);

  const handleUserSearchSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setUserSearchPage(1);
    setUserSearchPageRange(0);
  };

  const fetchUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          query: userSearchWord,
          page: userSearchPage,
          limit: 5,
        },
      })
      .then(res => {
        setUserList(res.data.items);
        setLastUserSearchPage(
          res.data.meta.totalPages > 0 ? res.data.meta.totalPages : 1,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(fetchUserData, [userSearchWord, userSearchPage]);

  useEffect(() => {
    setUserSearchPageRange(0);
    setUserSearchPage(1);
  }, [userSearchWord]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handleUserSearchSumbit);
    return () =>
      searchForm.removeEventListener("submit", handleUserSearchSumbit);
  }, [handleUserSearchSumbit]);

  useEffect(() => {
    setUserSearchWord("");
  }, []);

  return (
    <div className="modal__wrapper rent__modal-user">
      <div className="rent__modal-user__search-bar">
        <div className="rent__modal-user__text font-28-bold color-54">
          카뎃 정보
        </div>
        <AdminSearchBar
          width="long"
          placeHolder="대출자의 성명을 입력해주세요."
        />
      </div>
      {userList.map(user => (
        <RentUserList
          key={user.id}
          user={user}
          setSelectedUser={setSelectedUser}
          closeMidModal={closeMidModal}
        />
      ))}
      <div className="rent__modal-user__pagination">
        <AdminPagination
          userPage={userSearchPage}
          setUserPage={setUserSearchPage}
          pageRange={userSearchPageRange}
          setPageRange={setUserSearchPageRange}
          lastPage={lastUserSearchPage}
        />
      </div>
    </div>
  );
};

export default RentModalUser;

RentModalUser.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
  closeMidModal: PropTypes.func.isRequired,
};
