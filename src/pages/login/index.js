import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../Components/header";
import Input from "../../Components/input";
import { _login } from "../../service/user";
import "./style.scss";
function Login() {
  const { userId } = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState("");

  useEffect(function () {
    if (userId) {
      setNavigate("/");
    }
  });

  async function entrar() {
    _login(email, password);
  }

  if (navigate) {
    return <Redirect to={navigate} push={true} />;
  }
  return (
    <div className="Login">
      <Header noBack noLogout />
      <div className="banner-opacity"></div>
      <div className="main">
        <div className="login-box">
          <Input
            _label="Login"
            _type="email"
            _placeholder="email"
            _value={email}
            _onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            _label="Senha"
            _type="password"
            _placeholder="senha"
            _value={password}
            _onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn" onClick={entrar}>
            <span>Entrar</span>
          </button>
          <p
            onClick={() => {
              setNavigate("/cadastrar");
            }}
          >
            Ainda não tem conta?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
