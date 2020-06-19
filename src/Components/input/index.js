import React from "react";

import "./style.scss";
function Input({
  _label,
  _type,
  _placeholder,
  _value,
  _onChange,
  _erro,
  _disabled,
}) {
  return (
    <div className="input-box">
      <label className="label">{_label}</label>
      <input
        className={`input ${_erro ? " erro" : ""}`}
        type={_type}
        placeholder={_placeholder}
        value={_value}
        onChange={_onChange}
        disabled={_disabled}
      />
      {_erro && <span className="eror-mensagem">{_erro}</span>}
    </div>
  );
}

export default Input;
