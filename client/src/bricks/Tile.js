import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

import styles from "../styles/styles.css";
import ShoppingListDel from "./ShoppingListDel";
import UserContext from "../Provider";

function Tile ({ detail, lists }) {
  const navigate = useNavigate();
  const { users, canEdit} = useContext(UserContext);
  const [isDeleteModalShown, setDeleteModalShown] = useState(false);
  const ownerName = users.find((user) => user.id === detail.owner);
  const members = users
    .filter(user => detail.members.includes(user.id))
    .map(user => user.name);

  const handleTileClick = () => {
    navigate(`/shoppingList/${detail.id}`, {state: {lists, detail, ownerName, members}});
  };

  const archiving =  (updArchive) => {
    const updatedLists = lists.map(list => {
      if (list.id === updArchive.id) {
        return updArchive; // Ak sa zhoduje ID, aktualizujeme nákupný zoznam
      } else {
        return list; // Inak ponecháme nákupný zoznam nezmenený
      }
    });
  };

return (
  <div className="tile">
  <Card className="listCard">
   {detail.archived && (
      <div style={{color: "red", fontSize: "80%"}}>List is archived.</div>
    )}
  {canEdit(detail.owner) &&
    <div>
      <ShoppingListDel
        detail={detail}
        archiving={archiving}
        onClose={() => setDeleteModalShown(false)}
        isDeleteModalShown={isDeleteModalShown}
      />
    <Icon
      path={mdiTrashCanOutline}
      style={{ cursor: 'pointer', color: 'grey' }}
      size={0.8}
      onClick={() => {setDeleteModalShown(true)}}
    />
    </div>
    }
    <Card.Body>
        <strong> {detail.title} </strong> <br /> <br />
      <div style={{textAlign: "left"}}>
        <u>Owner:</u> {" "} {ownerName.name}
        <div>
        <br />
        <u>Members:</u>
        <div>{members.join(", ")}</div>

        <br />
        <u>Items:</u>
        <ul className="item-list">
        {detail.items
            .filter((item) => item.state === false)
            .map((item) => (
            <li>{item.item}</li>
        ))}
        </ul>
        </div>
      </div>
      <br />
      <Button 
        variant="primary"
        onClick={handleTileClick}
      >
        Detail
      </Button>
    </Card.Body>
  </Card>
  </div>
);
};

export default Tile;