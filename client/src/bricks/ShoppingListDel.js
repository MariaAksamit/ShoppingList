import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useList } from "../ListProvider"
import UserContext from "../UserProvider";

import styles from "../styles/styles.css";

export default function ShoppingListDel ({ detail, archiving, onClose, isDeleteModalShown, onDeleteSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteList } = useList();
  const {user, darkMode} = useContext(UserContext);
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

const handleDelete = () => {
  const requestData = {
    id: detail.id,
    userId: user.id
  };

  deleteList(requestData, () => {
      onDeleteSuccess();
    });    
  setShow(false);
  onClose();
  navigate(`/overview`);  
};

return (
<>
<Modal show={isModalShown} onHide={handleCloseModal}>
<div className={darkMode ? "blackBgr2" : ""}>

    <Modal.Header closeButton>
      <Modal.Title>Archive / delete shopping list </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>{t("Do you want to delete or archive / activate shopping list")} {detail.title} ?</div>
    </Modal.Body>
        
    <Modal.Footer>
      {!detail.archived ? (
      <Button 
        variant={darkMode ? "outline-primary" : "primary"}
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
        variant={darkMode ? "outline-primary" : "primary"}
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
        variant={darkMode ? "outline-danger" : "danger"}
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
             Cancel
            </Button>
            <Button 
              variant="danger"
              style={{marginLeft: "5px"}}
              onClick={handleDelete} 
            >
              {t("Delete")}
            </Button>
        </div>
    </Alert>
    </div>
  </Modal>
</>
);
};