import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Modal, { isModalOpen } from "../Modal";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import SubTitle from "../utils/SubTitle";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import RentButton from "./RentButton";
import Login from "../../img/login_icon.svg";
import Book from "../../img/admin_icon.svg";
import "../../css/Rent.css";
import InquireBoxUser from "./InquireBoxUser";
import InquireBoxRent from "./InquireBoxRent";

const Rent = () => {
  const userModal = useRecoilValue(isModalOpen);
  const [selectUser, setSelectUser] = useState(null);

  useEffect(() => {
    console.log(selectUser);
  }, [selectUser]);

  return (
    <main>
      <BackGround page="admin" />
      <section className="rent-title">
        <Title titleKorean="대출" titleEng="RENT BOOK" />
      </section>
      <div className="rent-subtitle">
        <SubTitle
          subTitle="대출에 필요한 정보를 입력해주세요"
          description="카뎃정보, 도서정보, 비고사항을 입력해주세요"
          alignItems="center"
        />
      </div>
      <div className="inquire-box-wrapper">
        <InquireBoxTitle
          Icon={Login}
          titleKO="카뎃 정보"
          titleEN="Cadet info"
        />
        <InquireBoxUser
          modalNum={1}
          selectUser={selectUser}
          setSelectUser={setSelectUser}
        />
      </div>
      <div className="inquire-box-wrapper">
        <InquireBoxTitle Icon={Book} titleKO="도서 정보" titleEN="Book info" />
        <InquireBoxRent modalNum={2} />
      </div>
      <RentButton />
      {userModal !== 0 ? <Modal setSelectUser={setSelectUser} /> : null};
    </main>
  );
};

export default Rent;
