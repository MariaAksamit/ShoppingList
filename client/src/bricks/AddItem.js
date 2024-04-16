import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import styles from "../styles/styles.css";

export default function AddItem ({ addItem, handleShowModal }) {
  const { t } = useTranslation();
  const [isModalShown, setShow] = useState(false);
  const [itemError, setItemError] = useState(null);
  const [formData, setFormData] = useState({
    item: "",
    amount: "",
    state: false,
  });

  const handleCloseModal = () => {
    setShow(false);
    setFormData({
      item: "",
      amount: "",
      state: false,
    });
  };

  const handleOpenModal = () => {
    handleShowModal();
    setFormData({
        item: "",
        amount: "",
        state: false,
      });
    setShow(true);
  }

  useEffect(() => {
    if (isModalShown) handleOpenModal();
  }, [isModalShown]);

  const handleSaveItem = () => {
    
    setItemError(null);

    if (formData.item.length < 2 || formData.item.length > 50) {
      setItemError(t("The item name must be 2 - 50 characters long."));
      return;
    };

    const newItem = {
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
      <Modal.Title>{t("Add new item")}: </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Group>
        <Form.Label>{t("Item")}</Form.Label>
        <Form.Control
          type="text"
          value={formData.item}
          minLength={2}
          maxLength={50}
          onChange={(e) => setField("item", e.target.value)}
          required
        />
        {itemError && (
        <Form.Text className="text-danger"> {itemError} </Form.Text>
        )}
      </Form.Group>
      <br />
      <Form.Group> 
        <Form.Label>{t("Amount")}</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.amount}
          onChange={(e) => setField("amount", e.target.value)}
          maxLength={50} 
        /> 
      </Form.Group>
    </Modal.Body>
        
    <Modal.Footer>
      <Button 
        variant="primary"
        style={{ marginLeft: "8px" }}
        onClick={handleSaveItem} 
      >
        {t("Add Item")}
      </Button>
      <Button 
        variant="secondary-outline"
        style={{ marginLeft: "8px"}}
        onClick={handleCloseModal} 
      >
        Cancel
      </Button>  
    </Modal.Footer>

  </Modal>
</>
);
};