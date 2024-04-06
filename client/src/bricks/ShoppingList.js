import React, { useState, useContext } from "react";
import { Alert, Button, Table, Row, Col, Form, Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom"

import styles from "../styles/styles.css";
import AddItem from "./AddItem";
import ShoppingListDel from "./ShoppingListDel";
import UserContext from "../Provider";

export default function ShoppingList ({ detail, lists, ownerName, members }) {
  const navigate = useNavigate();
  const {user, users, canEdit} = useContext(UserContext);
  const [listCall, setListCall] = useState({ state: "pending" });
  const [showAlert, setShowAlert] = useState(false);
  const [isModalShown, setShow] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [isDeleteModalShown, setDeleteModalShown] = useState(false);

  const [showAllItems, setShowAllItems] = useState(true);

  const initialItems = detail
    ? detail.items.map(entry => ({
      item: entry.item || "",
      amount: entry.amount || "",
      state: entry.state || "",
    }))
    : [];

  const [formData, setFormData] = useState({
    title: detail ? detail.title : "",
    members: members,
    items: initialItems,
    archived: detail ? detail.archived : false
    });

  const handleShowModal = () => {
    setShow(true);
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          items: prevFormData.items.filter((item) => item.item !== itemName),
        }));
      };

  const addItem = (newItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [...prevFormData.items, newItem],
    }));
  };

  const handleEditList = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
        
      setTitleError(null);
  
      if (formData.title.length < 3 || formData.title.length > 50) {
        setTitleError("The title must be 3 - 50 characters long.");
        return;
      };
  
      if (formData.items.length === 0) {
        setShowAlert(true);
        return;
      };

    const updatedList = {
      id: detail.id,
      title: formData.title,
      owner: user.id,
      members: formData.members,
      items: formData.items,
      archived: formData.archived
    };
          
    const response = await fetch("http://127.0.0.1:8000/shoppingList/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    });
      
    if (response.ok) {
      navigate(`/overview`);
    } else {
      const errorData = await response.json();
      setListCall({ state: "error", error: errorData });
    }
    } catch (error) {
      setListCall({ state: "error", error: error.message });
    } finally {
    }
  };
  
  const toggleShowAllItems = () => {
    setShowAllItems((prevShowAllItems) => !prevShowAllItems);
  };

  const filteredItems = showAllItems
  ? formData.items
  : formData.items.filter((item) => !item.state);

  const handleDeleteMember = (memberName) => {
    const member = users.find(member => member.name === memberName);
    const memberId = member ? member.id : null;

    setFormData(formData => ({
      ...formData,
      members: formData.members.filter(member => member !== memberName),
    }));
    
    if (memberId === user.id) navigate(`/`);  
    
  };

  const addMember = (newMember) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, newMember]
    }))
  };

  const handleBack = () => {
    navigate(`/overview`);
  };

  const archiving =  () => {
      return formData.archived= true 
  };

return (
  <>

  <div className="formDetail">
      <div>
  <Form>
      <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2">Shopping List:</Form.Label>
      <Col sm="10">
      {canEdit(detail.owner) &&
      <Form.Control
        required
        type="text"
        value={formData.title}
        minLength={3}
        maxLength={50}
        onChange={(e) => {setField("title", e.target.value)}}
        disabled={!canEdit()}                      
      />}
      {!canEdit(detail.owner) && (
        <Form.Control
          plaintext
          readOnly
          defaultValue={formData.title}
        />
      )}
      </Col>
    </Form.Group>
        <br />
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">Owner: </Form.Label>
      <Col sm="10">
        <Form.Control plaintext readOnly defaultValue={ownerName.name}/>
      </Col>
    </Form.Group>
      <br />
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Members</Accordion.Header>
        <Accordion.Body>
          <div>
            {formData.members.map((member) => (
              <div>
               {canEdit(detail.owner) && (
                <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'grey' }}
                    size={0.8}
                    onClick={() => handleDeleteMember(member)}
                  />
                )}
                  {" "}
                {member}
              </div>
            ))}       
          </div>
          <Row>
            <Col className="text-end">
              {canEdit(detail.owner) &&
                <DropdownButton size="sm" title="Add member" variant="outline-primary">
                {users
                  .filter((user) => !formData.members.some((member) => member.id === user.id))
                  .filter((user) => user.id !== detail.owner.id)
                  .map((user) => (
                    <Dropdown.Item key={user.id} onClick={() => addMember(user)}>
                      {user.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              }
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              {!canEdit(detail.owner) && (
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    handleDeleteMember(user.name);
                    handleBack();
                  }}
                >
                  Leave
                </Button>
              )}
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      <br />
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "5px" }}>
          <Button 
            variant="secondary" 
            style={{ marginBottom: "5px", width: "190px" }}
            onClick={toggleShowAllItems}
          >
            {showAllItems ? "Active Items" : "All Items"}
          </Button>
          <AddItem addItem={addItem} handleShowModal={handleShowModal} />
        </div>
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>Amount</th>
          <th>State</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((entry, index) => {
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
                    required 
                  > 
                  </Form.Control>
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    value={cellValues.amount}
                    onChange={(e) => {setTable(entry.item, { ...cellValues, amount: e.target.value })}}
                    required 
                  /> 
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={entry.state || false} 
                    onChange={(e) => setTable(entry.item, { ...cellValues, state: e.target.checked })}
                  />
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
    <br />
    <div className="formDetailButton">
      <Button 
        variant="success"
        onClick={handleEditList}
      >
          Save
      </Button>
    {canEdit(detail.owner) &&
      <Button 
        variant="danger"
        onClick={() => {setDeleteModalShown(true)}}
      > 
          Delete/Archive List
      </Button>
    }
      <ShoppingListDel 
        detail={detail}
        archiving={archiving}
        onClose={() => setDeleteModalShown(false)}
        isDeleteModalShown={isDeleteModalShown}
      />
      <Button 
        variant="secondary"
        onClick={handleBack}
      >
        Back
      </Button>
    </div>
    {isDeleteModalShown && (
      <ShoppingListDel
        detail={detail}
        archiving={archiving}
        handleShowModal={handleShowModal}
        onClose={() => setDeleteModalShown(false)} // Zatvorí modálne okno pre vymazanie
      />
    )}
  </div>
  </div>
  <Alert
    show={showAlert}
    variant="warning" 
    onClose={() => setShowAlert(false)}
    dismissible
  >
    <p> The list contains no items. Add at least one. </p>
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
    </div>
  </Alert> 
  </>
);
};