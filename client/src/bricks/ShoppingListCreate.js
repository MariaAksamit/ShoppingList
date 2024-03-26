import React, {useState, useContext, useEffect} from "react";
import { Modal, Button, Table, Row, Col, Form, Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import UserContext from "../Provider";

import styles from "../styles/styles.css";
import AddItem from "./AddItem";

export default function ShoppingList ({ handleShowModal }) {
  const {user, users } = useContext(UserContext);
  const [isModalShown, setShow] = useState(false);
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

  const handleDeleteMember = (memberId) => {
    setFormData(formData => ({
      ...formData,
      members: formData.members.filter(member => member.id !== memberId),
    }));
  };

  const addMember = (newMember) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, newMember]
    }))
  };

return (
  <>
  <Button 
    variant="success"
    onClick={handleOpenModal}
    style={{ marginLeft:"5px"}}
  >
  <Icon path={mdiPlus} size={1} />
    Create
  </Button>

  <Modal show={isModalShown} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Create new shopping list: </Modal.Title>
    </Modal.Header>

    <Modal.Body>
    <Form>
      <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2">Title:</Form.Label>
      <Col sm="10">
      <Form.Control
        required
        type="text"
        placeholder="Name of the shopping list"
        value={formData.title}
        minLength={3}
        maxLength={50}
        onChange={(e) => {setField("title", e.target.value)}}
      />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">Owner: </Form.Label>
      <Col sm="10">
        <Form.Control plaintext readOnly defaultValue={formData.owner}/>
      </Col>
    </Form.Group>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Members</Accordion.Header>
        <Accordion.Body>
          <div>
            {formData.members.map((member) => (
              <div key={member.id}>
                <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'grey' }}
                    size={0.8}
                    onClick={() => handleDeleteMember(member.id)}
                  />
                  {" "}
                {member.name}
              </div>
            ))}    
          </div>
          <Row>
            <Col className="text-end">
                <DropdownButton size="sm" title="Add member" variant="outline-primary">
                {users
                  .filter(us => ((us.id !== 0) && (us.id !== user.id)))
                  .filter((user) => !formData.members.some((member) => member.id === user.id))
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
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>Amount</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {formData.items.map((entry, index) => {
          const cellValues = getTableValues(entry.item);
            return (
              <tr key={entry.item}>
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
     <Button variant="success">Save</Button>
     <Button 
        variant="secondary"
        onClick={handleCloseModal}    
    >
            Cancel
    </Button>
  </Modal.Footer>   
  </Modal>
    </>
);
};