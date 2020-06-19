import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../Components/header";
import Input from "../../Components/input";
import { _create } from "../../service/user";
import "./style.scss";
function Login() {
  const { userId } = useSelector((state) => state);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [navigate, setNavigate] = useState("");

  const [validadion, setValidadion] = useState({
    fullname: "",
    email: "",
    password: "",
    confPassword: "",
  });

  useEffect(function () {
    if (userId) {
      setNavigate("/");
    }
  });

  function criar() {
    let fullnameV = fullname && fullname.length > 0;
    let emailV = email && email.length > 0;
    let passwordV = password && password.length > 0;
    let confPasswordV = confPassword === password;
    setValidadion({
      fullname: fullnameV ? "" : "campo obrigatorio",
      email: emailV ? "" : "campo obrigatorio",
      password: passwordV ? "" : "campo obrigatorio",
      confPassword: confPasswordV ? "" : "as senhas devem ser iguais",
    });
    if (!fullnameV || !emailV || !passwordV || !confPasswordV) {
      return;
    }
    _create(fullname, email, password);
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
            _label="Nome completo"
            _type="text"
            _placeholder="nome completo"
            _value={fullname}
            _onChange={(e) => {
              setFullname(e.target.value);
            }}
            _erro={validadion.fullname}
          />
          <Input
            _label="Email"
            _type="email"
            _placeholder="email"
            _value={email}
            _onChange={(e) => {
              setEmail(e.target.value);
            }}
            _erro={validadion.email}
          />
          <Input
            _label="Senha"
            _type="password"
            _placeholder="senha"
            _value={password}
            _onChange={(e) => {
              setPassword(e.target.value);
            }}
            _erro={validadion.password}
          />
          <Input
            _label="Confirmar senha"
            _type="password"
            _placeholder="Confirmar senha"
            _value={confPassword}
            _onChange={(e) => {
              setConfPassword(e.target.value);
            }}
            _erro={validadion.confPassword}
          />

          <button className="btn" onClick={criar}>
            <span>Criar</span>
          </button>
          <p
            onClick={() => {
              setNavigate("/login");
            }}
          >
            Ja tem conta?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
