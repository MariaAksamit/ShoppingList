import React, { useState, useEffect } from "react";
import { Modal, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles.css";

export default function ShoppingListDel ({ detail, archiving, onClose, isDeleteModalShown }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isModalShown, setShow] = useState(false);

  useEffect(() => {
    if (isDeleteModalShown) {
      setShow(true);
    }
  }, [isDeleteModalShown]);

  const handleCloseModal = () => {
    setShow(false);
    onClose();
  };

const handleDelete = async () => {
  try {
    console.log("Deleting list:", detail);
    const response = await fetch("http://127.0.0.1:8000/shoppingList/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: detail.id }),
    });

    if (response.ok) {
      console.log("List deleted successfully.");
    } else {
      const errorData = await response.json();
      console.error("Error deleting list.:", errorData);
    }
  } catch (error) {
    console.error("Error deleting list:", error);
  } finally {
    setShow(false);
    onClose();
    navigate(`/overview`);  
  }
};

const handleConfirmDelete = async () => {
  try {
    await handleDelete();
  } catch (error) {
    console.error("Error deleting recipe:", error);
  } finally {
    // Close the delete confirmation modal
    setShow(false);
    onClose();
  }
};

return (
<>
<Modal show={isModalShown} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Archive / delete shopping list </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>Do you want to delete or archive shopping list {detail.title} ?</div>
    </Modal.Body>
        
    <Modal.Footer>
      <Button 
        variant="primary"
        style={{ marginLeft: "8px" }}
        onClick={() => {
            archiving({ ...detail, archived: true });
            handleCloseModal(); 
        }}
        >
        Archive
      </Button>
      <Button 
        variant="danger"
        style={{ marginLeft: "8px" }}
        onClick={() => setShowAlert(true)} 
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

    <Alert
        show={showAlert}
        variant="danger" 
        onClose={() => setShowAlert(false)}
        dismissible
    >
        <p> Are you sure about delete this shopping list? </p>
        <hr />
        <div className="d-flex justify-content-end">
            <Button 
              onClick={() => {
                setShowAlert(false);
              }} 
                variant="outline-danger"
            >
             Cancel
            </Button>
            <Button 
              variant="danger"
              style={{marginLeft: "5px"}}
              onClick={handleConfirmDelete} 
            >
              Delete
            </Button>
        </div>
    </Alert>
  </Modal>
</>
);
};