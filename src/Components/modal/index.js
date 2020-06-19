import React, { useState, useEffect } from "react";

import "./style.scss";
function Modal({ title, isShow, onClose, children }) {
  return (
    <>
      {isShow && (
        <div className="Modal">
          <div className="panel">
            <div className="modal-header">
              <p className="tilte">{title}</p>
              <span className="close" onClick={onClose}>
                x
              </span>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
