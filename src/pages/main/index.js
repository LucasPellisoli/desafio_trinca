import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { getAllBarbecue, create } from "../../service/barbecue";
import Header from "../../Components/header";
import Card from "../../Components/card";
import BarbecueForm from "../../Components/barbecueForm";
import Modal from "../../Components/modal";

import bbq from "../../assets/icon_bbq.png";

import "./style.scss";

function Main() {
  const { barbecue, userId } = useSelector((state) => state);
  const [isLodding, setIslodding] = useState(true);
  const [navigate, setNavigate] = useState("");
  const [createModal, setCreateModal] = useState(false);

  useEffect(
    function () {
      getAllBarbecue();

      if (!userId) {
        setNavigate("/login");
      }
    },
    [isLodding]
  );

  function criar(body) {
    setCreateModal(false);
    create(body);
  }
  if (navigate) {
    return <Redirect to={navigate} push={true} />;
  }
  return (
    <div className="Main">
      <Header noBack />
      <div className="container">
        {barbecue &&
          barbecue.map((_barbecue) => (
            <Card
              _key={_barbecue._id}
              description={_barbecue.description}
              totalPeople={_barbecue.totalPeople}
              totalMoney={_barbecue.totalMoney}
              date={_barbecue.date}
            />
          ))}
        <div
          className="Card add-new-barbecue"
          onClick={() => setCreateModal(true)}
        >
          <div className="add-new-barbecue">
            <img className="add-new-barbecue-icon" src={bbq} />
            <span className="money">Adicionar Churras</span>
          </div>
        </div>
      </div>
      <Modal
        title="Criar novo Churras"
        isShow={createModal}
        onClose={() => setCreateModal(false)}
      >
        <BarbecueForm _submit={criar} />
      </Modal>
    </div>
  );
}

export default Main;
