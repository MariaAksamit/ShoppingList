import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import styles from "../styles/styles.css";

export default function ShoppingListDel ({ lists, detail, archiving, handleShowModal }) {
  const [isModalShown, setShow] = useState(false);
  
  const handleCloseModal = () => setShow(false);

  const handleOpenModal = () => {
    handleShowModal();
    setShow(true);
  }

  useEffect(() => {
    if (isModalShown) handleOpenModal();
  }, [isModalShown]);

  const handleDelete = () => {
    setShow(false);
};

const handleArchive = () => {
    const updArchive = { ...detail, archived: true }
    archiving(updArchive);
    setShow(false);
};

   
return (
<>
<Icon
    path={mdiTrashCanOutline}
    style={{ cursor: 'pointer', color: 'grey' }}
    size={0.8}
    onClick={() => handleOpenModal()}
/>

  <Modal show={isModalShown} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Archive / delete shopping list: </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>Do you want to delete or archive shopping list {detail.title} ?</div>
    </Modal.Body>
        
    <Modal.Footer>
      <Button 
        variant="primary"
        style={{ marginLeft: "8px" }}
        onClick={handleArchive} 
      >
        Archive
      </Button>
      <Button 
        variant="danger"
        style={{ marginLeft: "8px" }}
        onClick={handleDelete} 
      >
        Delete
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