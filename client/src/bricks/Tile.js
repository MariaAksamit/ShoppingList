import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

import styles from "../styles/styles.css";
import ShoppingListDel from "./ShoppingListDel";
import UserContext from "../UserProvider";
import { useList } from "../ListProvider"

function Tile ({ detail, lists, onLoadSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { users, canEdit, darkMode} = useContext(UserContext);
  const { updateList } = useList();
  const [isDeleteModalShown, setDeleteModalShown] = useState(false);
  const ownerName = users.find((user) => user.id === detail.owner);
  const members = users
    .filter(user => detail.members.includes(user.id))
    .map(user => user.name);

  const handleTileClick = () => {
    navigate(`/shoppingList/${detail.id}`, {state: {detail, ownerName, members}});
  };

  const archiving =  (archived) => {
    const updatedList = {
      id: detail.id,
      title: detail.title,
      owner: detail.owner,
      members: detail.members,
      items: detail.items,
      archived: archived
    };
      updateList(updatedList, () => {
      onLoadSuccess();
    });
    navigate(`/overview`);
  };
 
  const handleLoadSuccess = () => {
    onLoadSuccess();
  }; 

return (
  <Card className={`listCard ${darkMode ? 'dark-mode' : ''}`}>
   {detail.archived && (
      <div style={{color: "red", fontSize: "80%"}}>{t("List is archived.")}</div>
    )}
  
    <Card.Body>
        <strong className={`listCard ${darkMode ? 'nadpisDark' : ''}`}> {detail.title} </strong> <br /> <br />
      <div style={{textAlign: "left"}}>
        <u className={`listCard ${darkMode ? 'nadpisLight' : ''}`}>{t("Owner")}:</u> {" "} {ownerName.name}
        <div>
        <br />
        <u className={`listCard ${darkMode ? 'nadpisLight' : ''}`}>{t("Members")}:</u>
        <div>
          {members.slice(0, 3).join(", ")} {members.length > 3 && '...'}
        </div>
          <br />
        <u className={`listCard ${darkMode ? 'nadpisLight' : ''}`}>{t("Items")}:</u>
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
        variant={darkMode ? "outline-success" : "primary"}
        onClick={handleTileClick}
    >
        {t("Detail")}
    </Button>
    </div>
    {canEdit(detail.owner) && (
        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
            <ShoppingListDel
                detail={detail}
                archiving={archiving}
                onClose={() => setDeleteModalShown(false)}
                isDeleteModalShown={isDeleteModalShown}
                onDeleteSuccess={handleLoadSuccess}
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
);
};

export default Tile;