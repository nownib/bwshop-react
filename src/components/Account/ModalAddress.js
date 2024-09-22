import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderDetails.scss";
import Address from "../Cart/Address";

const ModalAddress = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} className="p-0">
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>
            {props.actionModalAddress === "UPDATE"
              ? "Edit address"
              : "Create address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Address
            dataModalAddress={props.dataModalAddress}
            actionModalAddress={props.actionModalAddress}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddress;
