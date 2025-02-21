import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../../css/UserBriefInfo.css";
import "../../css/UserDetailInfo.css";

const roles = ["미인증", "카뎃", "사서", "운영진"];

const UserInfoEdit = ({ infoKey, infoId, infoType, infoValue }) => {
  const [input, setInput] = useState(infoValue);

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  return (
    <div className="user-detail-info__edit color-54">
      <div className="user-detail-info__key font-18-bold">{infoKey}</div>
      <input
        className={`user-detail-info__edit-input edit-${infoId}`}
        type={infoType}
        autoComplete="off"
        value={input}
        onChange={onChange}
      />
    </div>
  );
};

const UserRoleEdit = ({ userRole, roleList }) => {
  return (
    <div className="user-detail-info__edit color-54">
      <div className="user-detail-info__key font-18-bold">역할</div>
      <select className="user-detail-info__edit-select edit-role">
        {roleList.map((role, index) => {
          if (index === userRole)
            return (
              <option value={index} selected>
                {role}
              </option>
            );
          return <option value={index}>{role}</option>;
        })}
      </select>
    </div>
  );
};

const UserInfoDisplay = ({ infoKey, infoValue }) => {
  return (
    <div className="user-detail-info__display color-54">
      <div className="user-detail-info__key font-18-bold">{infoKey}</div>
      <div className="user-detail-info__value font-18">{infoValue}</div>
    </div>
  );
};

const convertDatetoString = date => {
  let stringDate = "";

  stringDate += date.getFullYear();
  stringDate += "-";
  stringDate += date.getMonth() + 1 < 10 ? "0" : "";
  stringDate += date.getMonth() + 1;
  stringDate += "-";
  stringDate += date.getDate() < 10 ? "0" : "";
  stringDate += date.getDate();
  return stringDate;
};

const UserDetailInfo = ({
  user,
  setErrorCode,
  closeMidModal,
  openMiniModal,
}) => {
  const today = new Date();
  const [editMode, setEditMode] = useState(false);
  const [userIntraId, setUserIntraId] = useState(user.intraId);
  const [userNickname, setUserNickname] = useState(user.nickname);
  const [userSlack, setUserSlack] = useState(user.slack);
  const [userRoleNum, setUserRoleNum] = useState(user.role);
  const [userPenalty, setUserPenalty] = useState(user.penaltyEndDate);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
  };

  const patchUserInfo = async data => {
    await axios
      .patch(`${process.env.REACT_APP_API}/users/update/${user.id}`, data)
      .then(res => {
        const userInfo = res.data;
        setUserIntraId(userInfo.intraId);
        setUserNickname(userInfo.nickname);
        setUserSlack(userInfo.slack);
        setUserRoleNum(userInfo.role);
        setUserPenalty(userInfo.penaltyEndDate);
      })
      .catch(error => {
        closeMidModal();
        setErrorCode(error.response.data.errorCode);
        openMiniModal();
      });
  };

  const submitEdit = event => {
    event.preventDefault();
    const userEditForm = document.getElementById("edit-form");
    const intra = userEditForm.querySelector(".edit-intra-id").value;
    const nickname = userEditForm.querySelector(".edit-nickname").value;
    const roleNum = userEditForm.querySelector(".edit-role").value;
    const slack = userEditForm.querySelector(".edit-slack").value;
    const penalty = userEditForm.querySelector(".edit-penalty").value;

    const intraId = parseInt(intra, 10);
    const role = parseInt(roleNum, 10);

    const data = {
      nickname: nickname === "" ? null : nickname,
      intraId: Number.isNaN(intraId) ? null : intraId,
      slack: slack === "" ? null : slack,
      role: Number.isNaN(role) ? 0 : role,
      penaltyEndDate: penalty,
    };
    patchUserInfo(data);
    offEditMode();
  };

  return (
    <div className="user-detail-info">
      <div className="user-detail-info__title font-28-bold color-54">
        유저정보
      </div>
      {editMode ? (
        <form id="edit-form">
          <UserInfoDisplay infoKey="ID" infoValue={user.id} />
          <UserInfoDisplay infoKey="이메일" infoValue={user.email} />
          <UserInfoEdit
            infoKey="인트라ID"
            infoId="intra-id"
            infoType="text"
            infoValue={userIntraId}
          />
          <UserInfoEdit
            infoKey="닉네임"
            infoId="nickname"
            infoType="text"
            infoValue={userNickname}
          />
          <UserInfoEdit
            infoKey="슬랙ID"
            infoId="slack"
            infoType="text"
            infoValue={userSlack}
          />
          <UserRoleEdit userRole={userRoleNum} roleList={roles} />
          <div className="user-detail-info__line" />
          <UserInfoEdit
            infoKey="대출 불가 기간"
            infoId="penalty"
            infoType="date"
            infoValue={
              userPenalty && userPenalty >= convertDatetoString(today)
                ? userPenalty
                : convertDatetoString(today)
            }
          />
          <UserInfoDisplay
            infoKey="연체일"
            infoValue={user.overDueDay === 0 ? "-" : `${user.overDueDay}일`}
          />
          <div className="user-edit-button">
            <button
              className="user-edit-off-button"
              type="button"
              onClick={offEditMode}
            >
              <div className="user-edit-on-button__text font-20-bold color-ff">
                취소
              </div>
            </button>
            <button
              className="user-edit-submit-button"
              type="button"
              onClick={submitEdit}
            >
              <div className="user-edit-on-button__text font-20-bold color-ff">
                저장
              </div>
            </button>
          </div>
        </form>
      ) : (
        <>
          <UserInfoDisplay infoKey="ID" infoValue={user.id} />
          <UserInfoDisplay infoKey="이메일" infoValue={user.email} />
          <UserInfoDisplay infoKey="인트라ID" infoValue={userIntraId} />
          <UserInfoDisplay infoKey="닉네임" infoValue={userNickname} />
          <UserInfoDisplay infoKey="슬랙ID" infoValue={userSlack} />
          <UserInfoDisplay infoKey="역할" infoValue={roles[userRoleNum]} />
          <div className="user-detail-info__line" />
          <UserInfoDisplay
            infoKey="대출 불가 기간"
            infoValue={
              userPenalty && userPenalty >= convertDatetoString(today)
                ? userPenalty
                : "-"
            }
          />
          <UserInfoDisplay
            infoKey="연체일"
            infoValue={user.overDueDay === 0 ? "-" : `${user.overDueDay}일`}
          />
          <div className="user-edit-button">
            <button
              className="user-edit-on-button"
              type="button"
              onClick={onEditMode}
            >
              <div className="user-edit-on-button__text font-20-bold color-ff">
                수정
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailInfo;

UserDetailInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    nickname: PropTypes.string,
    intraId: PropTypes.number,
    slack: PropTypes.string,
    penaltyEndDate: PropTypes.string,
    overDueDay: PropTypes.string,
    role: PropTypes.number,
    reservations: PropTypes.arrayOf(
      PropTypes.shape({
        ranking: PropTypes.number,
        endAt: PropTypes.Date,
        lenderableDate: PropTypes.Date,
        title: PropTypes.string,
      }),
    ),
    lendings: PropTypes.arrayOf(
      PropTypes.shape({ dueDate: PropTypes.string, title: PropTypes.string }),
    ),
  }).isRequired,
  setErrorCode: PropTypes.func.isRequired,
  closeMidModal: PropTypes.func.isRequired,
  openMiniModal: PropTypes.func.isRequired,
};

UserInfoEdit.propTypes = {
  infoKey: PropTypes.string.isRequired,
  infoId: PropTypes.string.isRequired,
  infoType: PropTypes.string.isRequired,
  infoValue: PropTypes.string.isRequired,
};

UserRoleEdit.propTypes = {
  userRole: PropTypes.string.isRequired,
  roleList: PropTypes.string.isRequired,
};
UserInfoDisplay.propTypes = {
  infoKey: PropTypes.string.isRequired,
  infoValue: PropTypes.string.isRequired,
};
