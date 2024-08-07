import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom"
import { Button, Table, Row, Col, Form, Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { PieChart, Pie, Cell, Legend } from 'recharts';

import styles from "../styles/styles.css";
import AddItem from "./AddItem";
import ShoppingListDel from "./ShoppingListDel";
import AlertWin from "./AlertWin";
import UserContext from "../UserProvider";
import { useList } from "../ListProvider"

export default function ShoppingList({ detail, ownerName, members, onUpdateSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, users, canEdit, darkMode } = useContext(UserContext);
  const { updateList } = useList();
  const [showAlert, setShowAlert] = useState(false);
  const [isModalShown, setShow] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [itemsError, setItemsError] = useState(null);
  const [isDeleteModalShown, setDeleteModalShown] = useState(false);
  const [showAllItems, setShowAllItems] = useState(true);

  const initialItems = detail
    ? detail.items.map(entry => ({
      item: entry.item || "",
      amount: entry.amount || "",
      state: entry.state !== undefined ? entry.state : false,
    }))
    : [];

  const [formData, setFormData] = useState({
    title: detail ? detail.title : "",
    members: detail ? detail.members : [],
    items: initialItems,
    archived: detail ? detail.archived : false
  });

  useEffect(() => {
    if (!(user.id === detail.owner || formData.members.includes(user.id))) {
      alert(t("You are not authorized to view the shopping list") + ` "${detail.title}"`);
      handleBack();
    }
  }, [user.id, detail.owner, members]);


  const handleShowModal = () => setShow(true);

  const validateItems = () => {
    const errors = [];
    formData.items.forEach((item, index) => {
      if (item.item.length < 2 || item.item.length > 50 || item.amount.length > 50) {
        errors[index] = (t("Item name must be  2 - 50 and amount max 50 characters long."));
      }
    });
    return errors;
  };

  const handleEditList = () => {

    setTitleError(null);
    setItemsError(null);

    if (formData.title.length < 3 || formData.title.length > 50) {
      setTitleError(t("The title must be 3 - 50 characters long."));
      return;
    };

    const itemErrors = validateItems();
    if (Object.keys(itemErrors).length > 0) {
      setItemsError(itemErrors);
      return;
    };

    if (formData.items.length === 0) {
      setShowAlert(true);
      return;
    };

    const updatedList = {
      id: detail.id,
      title: formData.title,
      owner: detail.owner,
      members: formData.members,
      items: formData.items,
      archived: formData.archived
    };

    updateList(updatedList, () => {
      onUpdateSuccess();
    });
    navigate(`/overview`);
  };

  const setField = (name, val) => {
    setFormData((formData) => {
      return { ...formData, [name]: val };
    });
  };

  const getTableValues = (itemName) => {
    const entry = formData.items.find((a) => a.item === itemName);
    return {
      item: entry?.item || "",
      amount: entry?.amount || "",
      state: entry?.state || false,
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
            state: updatedValues.state,
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

  const toggleShowAllItems = () => {
    setShowAllItems((prevShowAllItems) => !prevShowAllItems);
  };

  const filteredItems = showAllItems
    ? formData.items
    : formData.items.filter((item) => !item.state);

  const deleteMember = (memberId) => {
    if (user.id === detail.owner) {
      setFormData(formData => ({
        ...formData,
        members: formData.members.filter(member => member !== memberId),
      }));
    } else {
      const updatedList = {
        id: detail.id,
        title: formData.title,
        owner: detail.owner,
        members: formData.members.filter(member => member !== memberId),
        items: formData.items,
        archived: formData.archived
      };
      updateList(updatedList, () => {
        onUpdateSuccess();
      });
      navigate(`/overview`);
    };
  };

  const addMember = (newMemberId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, newMemberId]
    }))
  };

  const handleBack = () => {
    navigate(`/overview`);
  };

  const archiving = (archived) => {
    const updatedList = {
      id: detail.id,
      title: formData.title,
      owner: detail.owner,
      members: formData.members,
      items: formData.items,
      archived: archived
    };
    updateList(updatedList, () => {
      onUpdateSuccess();
    });
    navigate(`/overview`);
  };


  // GRAF
  const completedItemsCount = formData.items.filter(item => item.state).length;
  const incompleteItemsCount = formData.items.filter(item => !item.state).length;

  const data = [
    { name: t("Resolved"), value: completedItemsCount },
    { name: t('Unresolved'), value: incompleteItemsCount },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <>

      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <div className={`formDetail ${darkMode ? 'dark-mode' : ''}`}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" style={{ width: '200px' }}>{t("Shopping List")}:</Form.Label>
              <Col sm="10" style={{ width: 'calc(100% - 200px)' }}>
                {canEdit(detail.owner) &&
                  <Form.Control
                    type="text"
                    value={formData.title}
                    minLength={3}
                    maxLength={50}
                    onChange={(e) => { setField("title", e.target.value) }}
                    disabled={!canEdit(detail.owner)}
                  />}
                {titleError && (
                  <Form.Text className="text-danger"> {titleError} </Form.Text>
                )}
                {!canEdit(detail.owner) && (
                  <Form.Control
                    plaintext
                    readOnly
                    className={darkMode ? "blackBgr2" : ""}
                    defaultValue={formData.title}
                  />
                )}
              </Col>
            </Form.Group>
            <br />
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2" style={{ width: '200px' }}>{t("Owner")}: </Form.Label>
              <Col sm="10" style={{ width: 'calc(100% - 200px)' }}>
                <Form.Control className={darkMode ? "blackBgr2" : ""} plaintext readOnly defaultValue={ownerName.name} />
              </Col>
            </Form.Group>
            <br />
            <Accordion bsPrefix={darkMode ? "accordion-dark" : ""}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Members</Accordion.Header>
                <Accordion.Body>
                  <div>
                    {formData.members.map((memberId) => {
                      const member = users.find(user => user.id === memberId);
                      return (
                        <div key={member.id}>
                          {canEdit(detail.owner) && (
                            <Icon
                              path={mdiTrashCanOutline}
                              style={{ cursor: 'pointer', color: 'grey' }}
                              size={0.8}
                              onClick={() => deleteMember(member.id)}
                            />
                          )}
                          {" "}
                          {member.name}
                        </div>
                      );
                    })}
                  </div>
                  <Row>
                    <Col className="text-end">
                      {canEdit(detail.owner) &&
                        <DropdownButton
                          size="sm"
                          title="Add member"
                          variant="outline-primary"
                          id={darkMode ? "nav-dropdown-dark" : "nav-dropdown-light"}
                          menuVariant={darkMode ? "dark" : "light"}
                        >
                          {users
                            .filter(us => ((us.id !== 0) && (us.id !== user.id)))
                            .filter((user) => !formData.members.includes(user.id))
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((user) => (
                              <Dropdown.Item key={user.id} onClick={() => addMember(user.id)}>
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
                          onClick={() => { deleteMember(user.id) }}


                        >
                          {t("Leave")}
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
                  variant={darkMode ? "outline-secondary" : "secondary"}
                  style={{ marginBottom: "5px", width: "190px" }}
                  onClick={toggleShowAllItems}
                >
                  {showAllItems ? t("Active Items") : t("All Items")}
                </Button>
                <AddItem addItem={addItem} handleShowModal={handleShowModal} />
              </div>
              <Table striped bordered variant={darkMode ? "dark" : ""}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("Item")}</th>
                    <th>{t("Amount")}</th>
                    <th>{t("State")}</th>
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
                            onChange={(e) => { setTable(entry.item, { ...cellValues, item: e.target.value }) }}
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
                            onChange={(e) => { setTable(entry.item, { ...cellValues, amount: e.target.value }) }}
                            maxLength={50}
                          />
                          {itemsError && itemsError[index] && (
                            <Form.Text className="text-danger"> {itemsError[index]} </Form.Text>
                          )}
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={entry.state}
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

          <div className="chart" >
            <PieChart width={250} height={350}>
              <Pie
                data={data}
                cx={120}
                cy={150}
                innerRadius={80}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
                payload={[
                  { value: t('Resolved'), type: 'square', id: 'ID01', color: COLORS[0] },
                  { value: t('Unresolved'), type: 'square', id: 'ID02', color: COLORS[1] },
                ]}
              />
            </PieChart>
          </div>
          <br />
          <br />
          <div className="formDetailButton">
            <Button
              variant={darkMode ? "outline-success" : "success"}
              onClick={handleEditList}
            >
              {t("Save")}
            </Button>
            {canEdit(detail.owner) &&
              <Button
                variant={darkMode ? "outline-danger" : "danger"}
                onClick={() => { setDeleteModalShown(true) }}
              >
                {t("Delete/Archive List")}
              </Button>
            }
            <ShoppingListDel
              detail={detail}
              archiving={archiving}
              onClose={() => setDeleteModalShown(false)}
              isDeleteModalShown={isDeleteModalShown}
              onDeleteSuccess={onUpdateSuccess}
            />
            <Button
              variant={darkMode ? "outline-secondary" : "secondary"}
              onClick={handleBack}
            >
              {t("Back")}
            </Button>
          </div>
          {isDeleteModalShown && (
            <ShoppingListDel
              detail={detail}
              archiving={archiving}
              handleShowModal={handleShowModal}
              onClose={() => setDeleteModalShown(false)}
            />
          )}
        </div>
        <br />
      </div>
      <div className="warning">
        <AlertWin
          showAlert={showAlert}
          onClose={() => setShowAlert(false)}
          varianta={"warning"}
          text={t("The list contains no items. Add at least one.")}
        />
      </div>

    </>
  );
};