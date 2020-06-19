import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import Header from "../../Components/header";
import Modal from "../../Components/modal";
import InBarbecueForm from "../../Components/inBarbecueForm ";

import people from "../../assets/icon_people.png";
import money from "../../assets/icon_money.png";

import notPayed from "../../assets/Ellipse.png";
import payed from "../../assets/EllipseFill.png";

import {
  addUserToBarbecue,
  removeUserToBarbecue,
  getById,
  updateUserToBarbecue,
} from "../../service/barbecue";

import "./style.scss";

function Barbecue() {
  const { currentBarbecue, userId } = useSelector((state) => state);
  const [isLodding, setIslodding] = useState(true);
  const [navigate, setNavigate] = useState("");
  const [entrarModal, setEntrarModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [contributions, setContributions] = useState(false);
  const [isUserInBabecue, setIsUserInBabecue] = useState(false);
  const [curentId, setCurentId] = useState("");

  useEffect(
    function () {
      let _curentId = window.location.pathname.split(`/`)[2];
      getById(_curentId);
      setCurentId(_curentId);
      if (!userId) {
        setNavigate("/login");
      }
    },
    [isLodding]
  );
  useEffect(
    function () {
      if (currentBarbecue && currentBarbecue.contributions) {
        setIsUserInBabecue(
          currentBarbecue?.contributions.some((c) => c._id === userId)
        );
      }
    },
    [currentBarbecue]
  );

  function entrar(body) {
    addUserToBarbecue(curentId, body);
    setEntrarModal(false);
    getById(curentId);
  }

  function editar(body) {
    updateUserToBarbecue(curentId, body);
    setEditModal(false);
    getById(curentId);
  }

  function openModal(id) {
    let _user = currentBarbecue.contributions.filter((c) => c._id === id)[0];
    setContributions(_user);
    setEditModal(true);
  }

  function remover(body) {
    removeUserToBarbecue(curentId, body);
    setEditModal(false);
  }

  if (navigate) {
    return <Redirect to={navigate} push={true} />;
  }
  return (
    <div className="Barbecue">
      <Header />
      <div className="container">
        <div className="barbecue-header">
          <div className="barbecue-detalhes">
            <span className="date">
              {moment(currentBarbecue.date).format("DD/MM")}
            </span>
            <span className="detalhes">{currentBarbecue.description}</span>
            {currentBarbecue.additionalNotes && (
              <span className="sub-title">
                {currentBarbecue.additionalNotes}
              </span>
            )}
            {currentBarbecue.withDrink && (
              <span className="sub-title">Bebidas inclusas</span>
            )}
          </div>
          <div className="barbecue-info">
            <div>
              <img src={people} />
              <span className="people">{currentBarbecue.totalPeople}</span>
            </div>
            <div>
              <img src={money} />
              <span className="money">{currentBarbecue.totalMoney}</span>
            </div>
          </div>
        </div>
        {!isUserInBabecue && (
          <div className="CTA">
            <span onClick={() => setEntrarModal(true)}>
              Adicionar Participante
            </span>
          </div>
        )}

        {currentBarbecue?.contributions?.map((user) => (
          <div
            className="barbecue-people"
            onClick={() => {
              openModal(user._id);
            }}
          >
            <div className="people-info">
              <div>
                <img src={user?.wasPaid ? payed : notPayed} />
                <span className="text">{user.fullname}</span>
              </div>
              <span
                className={`text ${user?.wasPaid ? "payed" : ""}`}
              >{`R$ ${user.value}`}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Particiapr do Churras"
        isShow={entrarModal}
        onClose={() => setEntrarModal(false)}
      >
        <InBarbecueForm
          _submit={entrar}
          _valueSuggested={currentBarbecue?.valueSuggested}
        />
      </Modal>

      <Modal
        title={"Ediar"}
        isShow={editModal}
        onClose={() => setEditModal(false)}
      >
        <InBarbecueForm
          initalValue={contributions}
          _submit={editar}
          _remover={remover}
        />
      </Modal>
    </div>
  );
}

export default Barbecue;
