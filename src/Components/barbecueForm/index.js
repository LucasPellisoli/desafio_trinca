import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { create } from "../../service/barbecue";

import Input from "../input";
import Checkbox from "../checkbox";
import "./style.scss";
function BarbecueForm({ initalValue, _submit }) {
  const [description, setDescription] = useState(
    initalValue?.description || ""
  );
  const [data, setData] = useState(initalValue?.data || "");
  const [withDrink, setWithDrink] = useState(initalValue?.withDrink || "");
  const [valueSuggested, setValueSuggested] = useState(
    initalValue?.valueSuggested || ""
  );
  const [additionalNotes, setAdditionalNotes] = useState(
    initalValue?.additionalNotes || ""
  );

  const { userId } = useSelector((state) => state);
  const [validadion, setValidadion] = useState({ description: "", data: "" });
  function newBarbecue() {
    let descriptionV = description && description.length > 0;
    let dataV = data && data.length > 0;
    setValidadion({
      description: descriptionV ? "" : "esse campo é obrigatorio ",
      data: dataV > 0 ? "" : "esse campo é obrigatorio ",
    });
    if (!(dataV && descriptionV)) {
      return;
    }
    _submit({
      description: description,
      additionalNotes: additionalNotes,
      criededBy: userId,
      withDrink: withDrink,
      valueSuggested: valueSuggested,
      date: data,
    });
  }

  return (
    <div className="BarbecueForm">
      <Input
        _label="Nome do evento"
        _value={description}
        _onChange={(e) => {
          setDescription(e.target.value);
        }}
        _erro={validadion.description}
      />
      <Input
        _label="Infromações adicionais"
        _value={additionalNotes}
        _onChange={(e) => {
          setAdditionalNotes(e.target.value);
        }}
      />
      <Input
        _label="Sugestão de valor (R$)"
        _type="number"
        _value={valueSuggested}
        _onChange={(e) => {
          setValueSuggested(e.target.value);
        }}
      />
      <Input
        _label="Data"
        _type="date"
        _value={data}
        _onChange={(e) => {
          setData(e.target.value);
        }}
        _erro={validadion.data}
      />
      <Checkbox
        _label="Bebidas inclusa"
        _value={withDrink}
        _onClick={() => {
          setWithDrink(!withDrink);
        }}
      />
      <button className="btn" onClick={newBarbecue}>
        <span>Salvar</span>
      </button>
    </div>
  );
}

export default BarbecueForm;
