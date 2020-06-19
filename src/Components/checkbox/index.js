import React from "react";

import "./style.scss";
function Checkbox({ _label, _value, _onClick }) {
  return (
    <div className="checkbox-box">
      <div
        className={`checkbox ${_value ? "ckecked" : ""}`}
        onClick={_onClick}
      ></div>
      <label className="label">{_label}</label>
    </div>
  );
}

export default Checkbox;
