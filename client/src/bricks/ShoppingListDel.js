import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import UserContext from "../Provider";

import styles from "../styles/styles.css";

export default function ShoppingListDel ({ detail, archiving, onClose, isDeleteModalShown }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
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
    const requestData = {
      id: detail.id,
      userId: user.id
    };

    const response = await fetch("http://127.0.0.1:8000/shoppingList/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
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
      <div>{t("Do you want to delete or archive / activate shopping list")} {detail.title} ?</div>
    </Modal.Body>
        
    <Modal.Footer>
      {!detail.archived ? (
      <Button 
        variant="primary"
        style={{ marginLeft: "8px" }}
        onClick={() => {
            archiving({ ...detail, archived: true });
            handleCloseModal(); 
        }}
        >
        {t("Archive")}
      </Button>
    ) : (
      <Button 
        variant="primary"
        style={{ marginLeft: "8px" }}
        onClick={() => {
            archiving({ ...detail, archived: false });
            handleCloseModal(); 
        }}
        >
        {t("Activate")}
      </Button>
    )}
      <Button 
        variant="danger"
        style={{ marginLeft: "8px" }}
        onClick={() => setShowAlert(true)} 
      >
        {t("Delete")}
      </Button>
      <Button 
        variant="secondary-outline"
        style={{ marginLeft: "8px"}}
        onClick={handleCloseModal} 
      >
        {t("Close")}
      </Button>  
    </Modal.Footer>

    <Alert
        show={showAlert}
        variant="danger" 
        onClose={() => setShowAlert(false)}
        dismissible
    >
        <p> {t("Are you sure about delete this shopping list?")} </p>
        <hr />
        <div className="d-flex justify-content-end">
            <Button 
              onClick={() => {
                setShowAlert(false);
              }} 
                variant="outline-danger"
            >
             {t("Cancel")}
            </Button>
            <Button 
              variant="danger"
              style={{marginLeft: "5px"}}
              onClick={handleConfirmDelete} 
            >
              {t("Delete")}
            </Button>
        </div>
    </Alert>
  </Modal>
</>
);
};