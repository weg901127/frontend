import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import BookDetail from "./component/BookDetail";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Infomation from "./component/Information";
import Main from "./component/Main";
import Search from "./component/Search";
import Auth from "./component/Auth";
import Logout from "./component/Logout";
import Rent from "./component/Rent";
// import BookInfo from "./component/BookInfo";
import "./css/reset.css";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Main} />
        <Route path="/infomation" exact component={Infomation} />
        <Route path="/rent" exact component={Rent} />
        <Route path="/search" component={Search} />
        <Route path="/info/:id" component={BookDetail} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
