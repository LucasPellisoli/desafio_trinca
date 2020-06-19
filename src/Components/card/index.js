import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";

import people from "../../assets/icon_people.png";
import money from "../../assets/icon_money.png";
import gear from "../../assets/gear.png";
import "./style.scss";

function Card({ _key, description, totalPeople, totalMoney, date }) {
  let _date = moment(date).format("DD/MM");
  const [navigate, setNavigate] = useState("");

  if (navigate) {
    return <Redirect to={navigate} push={true} />;
  }

  return (
    <div
      key={_key}
      className="Card"
      onClick={() => setNavigate(`barbecue/${_key}`)}
    >
      <p className="date">{_date}</p>
      <p className="description">{description}</p>
      <div className="info">
        <div>
          <img src={people} />
          <span className="people">{totalPeople}</span>
        </div>
        <div>
          <img src={money} />
          <span className="money">{totalMoney}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
