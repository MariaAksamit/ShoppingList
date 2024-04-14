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

  const archiving =  (archived) => {
    const updatedLists = lists.map(list => {
      if (list.id === archived.id) {
        return archived;
      } else {
        return list;
      }
    });
  };

return (
  <div className="tile">
  <Card className="listCard">
   {detail.archived && (
      <div style={{color: "red", fontSize: "80%"}}>List is archived.</div>
    )}
  
    <Card.Body>
        <strong> {detail.title} </strong> <br /> <br />
      <div style={{textAlign: "left"}}>
        <u>Owner:</u> {" "} {ownerName.name}
        <div>
        <br />
        <u>Members:</u>
        <div>
          {members.slice(0, 3).join(", ")} {members.length > 3 && '...'}
        </div>
          <br />
        <u>Items:</u>
        <ul className="item-list">
        {detail.items
            .filter((item) => item.state === false)
            .slice(0, 3)
            .map((item, index) => (
            <li key={index}>{item.item}</li>
        ))}
        {detail.items.filter((item) => item.state === false).length > 3 && (
        <li key="more">...</li>
        )}
        </ul>
        </div>
      </div>
      <br />
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
    <Button 
        variant="primary"
        onClick={handleTileClick}
    >
        Detail
    </Button>
    </div>
    {canEdit(detail.owner) && (
        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
            <ShoppingListDel
                detail={detail}
                archiving={archiving}
                onClose={() => setDeleteModalShown(false)}
                isDeleteModalShown={isDeleteModalShown}
            />
            <Icon
                path={mdiTrashCanOutline}
                style={{ cursor: 'pointer', color: 'grey' }}a
                size={0.8}
                onClick={() => {setDeleteModalShown(true)}}
            />
        </div>
    )}
    </Card.Body>
  </Card>
  </div>
);
};

export default Tile;