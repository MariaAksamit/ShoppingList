import React, {useState, useContext, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { Alert, Modal, Button, Table, Row, Col, Form, Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import UserContext from "../UserProvider";
import { useList } from "../ListProvider"

import styles from "../styles/styles.css";
import AddItem from "./AddItem";

export default function ShoppingListCreate ({ handleShowModal, onCreateSuccess }) {
  const { t } = useTranslation();
  const {user, users, darkMode } = useContext(UserContext);
  const { createList } = useList();
  const [isModalShown, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [itemsError, setItemsError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    owner: user.name,
    members: [],
    items: [],
    });

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleOpenModal = () => {
    setFormData({
      title: "",
      owner: user.name,
      members: [],
      items: [],
    });
    handleShowModal();
    setShow(true);
  };

  useEffect(() => {
    if (isModalShown) handleOpenModal();
    }, [isModalShown]);     

  const validateItems = () => {
    const errors = [];
      formData.items.forEach((item, index) => {
        if (item.item.length < 2 || item.item.length > 50 || item.amount.length > 50) {
          errors.push(t("Item name must be  2 - 50 and amount max 50 characters long."));
        }
      });
      return errors;
  };

  const setField = (name, val) => {
    setFormData((formData) => {
      return {...formData, [name]: val};
    });
  };

  const getTableValues = (itemName) => {
    const entry = formData.items.find((a) => a.item === itemName);
      return {
        item: entry?.item || "",
        amount: entry?.amount || "",
      };
    };
  
  const setTable = (itemName, updatedValues) => {
    setFormData((prevFormData) => {
      const newItems = prevFormData.items.map((entry) => {
        if (entry.item === itemName) {
          return {
            ...entry,
            item: updatedValues.item,
            amount: updatedValues.amount,
            state: updatedValues.state || false,
          };
        }
          return entry;
          });

          return {
            ...prevFormData,
            items: newItems,
          };
        });
      };

  const deleteItem = (itemName) => {
    setFormData((formData) => ({
      ...formData,
      items: formData.items.filter((item) => item.item !== itemName),
    }));
  };

  const addItem = (newItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [...prevFormData.items, newItem],
    }));
  };

  const deleteMember = (memberId) => {
    setFormData(formData => ({
      ...formData,
      members: formData.members.filter(member => member !== memberId),
    }));
  };

  const addMember = (newMember) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, newMember.id]
    }))
  };

  const handleCreateList = () => {
    setTitleError(null);
    setItemsError(null);

    if (formData.title.length < 3 || formData.title.length > 50) {
      setTitleError(t("The title must be 3 - 50 characters long."));
    return;
    };

    const itemErrors = validateItems();

    if (itemErrors.length > 0) {
      setItemsError(itemErrors);
    return;
    };

    if (formData.items.length === 0) {
      setShowAlert(true);
    return;
    };

    const newList = {
      title: formData.title,
      owner: user.id,
      members: formData.members,
      items: formData.items,
      archived: false
    };
    
    createList(newList, () => {
      onCreateSuccess();
    });
    setShow(false);
  };

return (
  <>
  <Button 
    variant={darkMode ? "outline-light" : "success"}
    onClick={handleOpenModal}
    style={{ marginLeft:"5px", marginRight: "15px"}}
  >
  <Icon path={mdiPlus} size={1} />
    {t("Create")}
  </Button>

  <Modal show={isModalShown} onHide={handleCloseModal}>
    <div className={darkMode ? "blackBgr2" : ""}>

    <Modal.Header closeButton>
      <Modal.Title>{t("Create new shopping list")}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
    <Form>
      <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2">{t("Title")}:</Form.Label>
      <Col sm="10">
      <Form.Control
        required
        type="text"
        placeholder={t("Name of the shopping list")}
        value={formData.title}
        minLength={3}
        maxLength={50}
        onChange={(e) => {setField("title", e.target.value)}}
      />
      </Col>
      {titleError && (
        <Form.Text className="text-danger"> {titleError} </Form.Text>
        )}
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">Owner: </Form.Label>
      <Col sm="10">
        <Form.Control className={darkMode ? "blackBgr2" : ""} plaintext readOnly defaultValue={formData.owner}/>
      </Col>
    </Form.Group>
    <Accordion bsPrefix={darkMode ? "accordion-dark" : ""}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("Members")}</Accordion.Header>
        <Accordion.Body>
          <div>
            {formData.members.map((memberId) => {
              const member = users.find(user => user.id === memberId);
              return (
              <div key={member.id}>
                <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'grey' }}
                    size={0.8}
                    onClick={() => deleteMember(member.id)}
                  />
                  {" "}
                {member.name}
              </div>
            );
          })}    
          </div>
          <Row>
            <Col className="text-end">
                <DropdownButton 
                  size="sm" 
                  title={t("Add Member")} 
                  variant="outline-primary"
                  id={darkMode ? "nav-dropdown-dark" : "nav-dropdown-light" }
                  menuVariant={darkMode ? "dark" : "light"}
                >
                {users
                  .filter(us => ((us.id !== 0) && (us.id !== user.id)))
                  .filter((user) => !formData.members.includes(user.id))
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((user) => (
                    <Dropdown.Item key={user.id} onClick={() => addMember(user)}>
                      {user.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      <br />
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "5px" }}>
          <AddItem addItem={addItem} handleShowModal={handleShowModal} />
        </div>
    <Table striped bordered variant={darkMode ? "dark" : ""}>
      <thead>
        <tr>
          <th>#</th>
          <th>{t("Item")}</th>
          <th>{t("Amount")}</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {formData.items.map((entry, index) => {
          const cellValues = getTableValues(entry.item);
            return (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <Form.Control 
                    type="text"
                    value={cellValues.item}
                    onChange={(e) => {setTable(entry.item, { ...cellValues, item: e.target.value })}}                           
                    minLength={2}
                    maxLength={50}   
                    required 
                  /> 
                  {itemsError && itemsError[index] && (
                    <Form.Text className="text-danger"> {itemsError[index]} </Form.Text>
                  )}
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    value={cellValues.amount}
                    onChange={(e) => {setTable(entry.item, { ...cellValues, amount: e.target.value })}}
                    maxLength={50} 
                  /> 
                  {itemsError && itemsError[index] && (
                    <Form.Text className="text-danger"> {itemsError[index]} </Form.Text>
                  )}
                </td>
                <td>
                  <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'grey' }}
                    size={0.8}
                    onClick={() => deleteItem(entry.item)}
                  ></Icon>
                </td>
              </tr>
            );
        })}
      </tbody>
    </Table>
      </div>
  </Form>
  </Modal.Body>
  
  <Modal.Footer>
     <Button 
        variant={darkMode ? "outline-success" : "success"}
        onClick={handleCreateList}
     >
            {t("Save")}
     </Button>
     <Button 
        variant="outline-secondary"
        onClick={handleCloseModal}    
    >
            {t("Cancel")}
    </Button>
  </Modal.Footer>  
  
  <Alert
    show={showAlert}
    variant="warning" 
    onClose={() => setShowAlert(false)}
    dismissible
  >
    <p> {t("The list contains no items. Add at least one.")} </p>
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
    </div>
  </Alert> 
  </div>
</Modal>
  </>
);
};