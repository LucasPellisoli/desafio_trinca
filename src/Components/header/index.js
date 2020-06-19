import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { logout } from "../../service/user";

import back from "../../assets/left-arrow.png";
import _logout from "../../assets/logout.png";
import "./style.scss";

function Header({ noBack, noLogout }) {
  const [navigate, setNavigate] = useState("");
  let history = useHistory();

  if (navigate) {
    return <Redirect to={navigate} push={true} />;
  }

  function _logOut() {
    setNavigate("/login");
    logout();
  }

  function _goBack() {
    history.goBack();
  }

  return (
    <div className="Header">
      {!noBack && <img className="back" src={back} onClick={_goBack} />}
      {!noLogout && <img className="logout" src={_logout} onClick={_logOut} />}
      <p>Agenda de Churras</p>
    </div>
  );
}

export default Header;
