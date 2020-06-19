import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { create } from "../../service/barbecue";

import Input from "../input";
import Checkbox from "../checkbox";
import "./style.scss";
function InBarbecueForm({
  initalValue,
  _submit,
  disabled,
  _valueSuggested,
  _remover,
}) {
  const [fullname, setFullname] = useState(initalValue?.fullname || "");
  const [valor, setValor] = useState(
    initalValue?.value || _valueSuggested || ""
  );
  const [wasPaid, setWasPaid] = useState(initalValue?.wasPaid || false);
  const { userId } = useSelector((state) => state);
  const [validadion, setValidadion] = useState({ valor: "", fullname: "" });

  function editUser() {
    let fullnameV = fullname && fullname.length > 0;
    let valorV = valor > 0;
    setValidadion({
      fullname: fullnameV ? "" : "campo obrigatorio ",
      valor: valorV ? "" : "campo obrigatorio ",
    });
    if (!valorV) {
      return;
    }
    _submit({
      _id: initalValue?._id || "",
      fullname: fullname,
      value: valor,
      wasPaid: wasPaid,
    });
  }

  function removeUser() {
    _remover({
      _id: initalValue._id,
    });
  }
  return (
    <div className="BarbecueForm">
      <Input
        _label="Nome completo"
        _type="text"
        _value={fullname}
        _onChange={(e) => {
          setFullname(e.target.value);
        }}
        _disabled={disabled}
        _erro={validadion.valor}
      />
      <Input
        _label="Valor (R$)"
        _type="number"
        _value={valor}
        _onChange={(e) => {
          setValor(e.target.value);
        }}
        _disabled={disabled}
        _erro={validadion.valor}
      />
      <Checkbox
        _label="Pago"
        _value={wasPaid}
        _onClick={() => {
          if (!disabled) {
            setWasPaid(!wasPaid);
          }
        }}
      />

      <div className="btn-box">
        {_remover && (
          <button className="btn" onClick={removeUser}>
            <span>Remover</span>
          </button>
        )}
        <button className="btn" onClick={editUser}>
          <span>Salvar</span>
        </button>
      </div>
    </div>
  );
}

export default InBarbecueForm;
