import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import styles from "../styles/styles.css";

export default function AddItem ({ addItem, handleShowModal }) {
  const [isModalShown, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    item: "",
    amount: "",
    state: false,
  });

  const handleCloseModal = () => {
    setShow(false);
    setFormData({
      id: "",
      item: "",
      amount: "",
      state: false,
    });
  };

  const handleOpenModal = () => {
    handleShowModal();
    setFormData({
        id: "",
        item: "",
        amount: "",
        state: false,
      });
    setShow(true);
  }

  useEffect(() => {
    if (isModalShown) handleOpenModal();
  }, [isModalShown]);

  const generateId = () => {
    const randomId = Math.floor(Math.random()*(900));
    return randomId;
  };

  const handleSaveItem = () => {
    const newItem = {
      id: generateId(),
      item: formData.item,
      amount: formData.amount,
      state: false,
    };
    addItem(newItem);
    setShow(false);
};

  const setField = (name, val) => {
    setFormData((formData) => {
    return { ...formData, [name]: val };
    });
  };
   
return (
<>
  <Button 
    variant="success"
    style={{ marginLeft: "auto", marginBottom: "5px", display: "block" }} 
    onClick={handleOpenModal}>
    <Icon path={mdiPlus} size={1} />
  </Button>

  <Modal show={isModalShown} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add new item: </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Group>
        <Form.Label>New item name</Form.Label>
        <Form.Control
          type="text"
          value={formData.item}
          onChange={(e) => setField("item", e.target.value)}
          required
        />
      </Form.Group>
      <br />
      <Form.Group> 
        <Form.Label>Amount</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.amount}
          onChange={(e) => setField("amount", e.target.value)}
          required
        /> 
      </Form.Group>
    </Modal.Body>
        
    <Modal.Footer>
      <Button 
        variant="primary"
        style={{ marginLeft: "8px" }}
        onClick={handleSaveItem} 
      >
        Add Item
      </Button>
      <Button 
        variant="secondary-outline"
        style={{ marginLeft: "8px"}}
        onClick={handleCloseModal} 
      >
        Close
      </Button>  
    </Modal.Footer>
  </Modal>
</>
);
};