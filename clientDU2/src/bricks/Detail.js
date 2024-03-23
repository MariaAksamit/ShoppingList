import React, {useState, useContext} from "react";
import { Link } from 'react-router-dom';
import { Button, Table, Row, Col, Form, Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

import styles from "../styles/styles.css";
import AddItem from "./AddItem";
import UserContext from "../Provider";

export default function Detail ({ detail }) {
  const {user, users, canEdit, canShowDetail} = useContext(UserContext);
  const [isMember, setIsMember] = useState(true);
  const [isModalShown, setShow] = useState(false);
  const [showAllItems, setShowAllItems] = useState(true);
  
  const initialItems = detail
    ? detail.items.map(entry => ({
      id: entry.id || "",
      item: entry.item || "",
      amount: entry.amount || "",
      state: entry.state || "",
    }))
    : [];

    const initialMembers = detail
    ? detail.members.map(entry => ({
      id: entry.id || "",
      name: entry.name || "",
    }))
    : [];

  const [formData, setFormData] = useState({
    title: detail ? detail.title : "",
    members: initialMembers,
    items: initialItems,
    });

  const handleShowModal = () => {
    setShow(true);
  };

  const getTableValues = (itemId) => {
    const entry = formData.items.find((a) => a.id === itemId);
      return {
        item: entry?.item || "",
        amount: entry?.amount || "",
      };
    };
    
  const setTable = (itemId, updatedValues) => {
    setFormData((prevFormData) => {
      const newItems = prevFormData.items.map((entry) => {
        if (entry.id === itemId) {
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

  const setField = (name, val) => {
    setFormData((formData) => {
      return {...formData, [name]: val};
    });
  };

  const deleteItem = (itemId) => {
        setFormData((formData) => ({
          ...formData,
          items: formData.items.filter((item) => item.id !== itemId),
        }));
      };

  const addItem = (newItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [...prevFormData.items, newItem],
    }));
  };

  const toggleShowAllItems = () => {
    setShowAllItems((prevShowAllItems) => !prevShowAllItems);
  };

  const filteredItems = showAllItems
  ? formData.items
  : formData.items.filter((item) => !item.state);

  const handleDeleteMember = (memberId) => {
    setFormData(formData => ({
      ...formData,
      members: formData.members.filter(member => member.id !== memberId),
    }));
    
    if (memberId === user.id) {
      user.role.id = 0;
    };
  };

  const addMember = (newMember) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, newMember]
    }))
  };

return (
  <div className="formDetail">
    {canShowDetail() ? (
      <div>
  <Form>
      <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2">Shopping List:</Form.Label>
      <Col sm="10">
      {canEdit() &&
      <Form.Control
        required
        type="text"
        value={formData.title}
        minLength={3}
        maxLength={50}
        onChange={(e) => {setField("title", e.target.value)}}
        disabled={!canEdit()}                      
      />}
      {!canEdit() && (
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
        <Form.Control plaintext readOnly defaultValue={detail.owner.name}/>
      </Col>
    </Form.Group>
      <br />
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Members</Accordion.Header>
        <Accordion.Body>
          <div>
            {formData.members.map((member) => (
              <div key={member.id}>
               {canEdit() && (
                <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'grey' }}
                    size={0.8}
                    onClick={() => handleDeleteMember(member.id)}
                  />
                )}
                  {" "}
                {member.name}
              </div>
            ))}       
          </div>
          <Row>
            <Col className="text-end">
              {canEdit() &&
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
              {!canEdit() && (
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteMember(user.id)}
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
          const cellValues = getTableValues(entry.id);
            return (
              <tr key={entry.id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <Form.Control 
                    type="text"
                    value={cellValues.item}
                    onChange={(e) => {setTable(entry.id, { ...cellValues, item: e.target.value })}}                           
                    required 
                  > 
                  </Form.Control>
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    value={cellValues.amount}
                    onChange={(e) => {setTable(entry.id, { ...cellValues, amount: e.target.value })}}
                    required 
                  /> 
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={entry.state || false} 
                    onChange={(e) => setTable(entry.id, { ...cellValues, state: e.target.checked })}
                  />
                </td>
                <td>
                  <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'grey' }}
                    size={0.8}
                    onClick={() => deleteItem(entry.id)}
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
     <Button variant="success">Save</Button>
      {canEdit() &&
     <Button variant="danger"> Delete/Archive List</Button>
      }
     <Button variant="secondary">Cancel</Button>
    
    </div>
    </div>
    ) : (
      <div> Nemáte dostatočné oprávnenia na zobrazenie tohto nákupného zoznamu. </div>
    )}
    </div>
);
};