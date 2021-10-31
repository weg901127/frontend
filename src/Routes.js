import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilState } from "recoil";
import BookDetail from "./component/book/BookDetail";
import Footer from "./component/utils/Footer";
import NotFound from "./component/utils/NotFound";
import Header from "./component/utils/Header";
import Information from "./component/information/Information";
import Main from "./component/main/Main";
import Search from "./component/search/Search";
import Auth from "./component/login/Auth";
import Logout from "./component/login/Logout";
import Rent from "./component/rent/Rent";
import "./css/reset.css";
import "./App.css";
import ReservedLoan from "./component/reservedloan/ReservedLoan";
import ReturnBook from "./component/return/ReturnBook";
import userState from "./atom/userState";

function Routes() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    if (localUser && !user.isLogin && localUser.isLogin) {
      setUser(localUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/information" exact component={Information} />
        <Route path="/search" exact component={Search} />
        <Route path="/info/:id" exact component={BookDetail} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        {user.isLogin && <Route path="/rent" exact component={Rent} />}
        {user.isLogin && <Route path="/return" exact component={ReturnBook} />}
        {user.isLogin && (
          <Route path="/reservation" exact component={ReservedLoan} />
        )}
        <Route component={NotFound} />
      </Switch>
      <Route path="/" component={Footer} />
    </BrowserRouter>
  );
}

export default Routes;
