import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import styles from "../styles/styles.css";

function Tile ({ detail, users }) {
  const navigate = useNavigate();
  const ownerName = users.find((user) => user.id === detail.owner);
  const members = users
    .filter(user => detail.members.includes(user.id))
    .map(user => user.name);
  
  const handleTileClick = () => {
    navigate(`/shoppingList/${detail.id}`, {state: {detail, ownerName, members}});
  };

return (
  <div className="tile" onClick={handleTileClick}>
  <Card className="listCard">
    <Card.Body>
        <strong> {detail.title} </strong> <br /> <br />
      <div style={{textAlign: "left"}}>
        <u>Owner:</u> {" "} {ownerName.name}
        <br />
        <div>
        <u>Members:</u>
        {members.map((member) => (
            <div>{member}</div>
        ))}
        <br />
        <u>Items:</u>
        {detail.items
            .filter((item) => item.state === false)
            .map((item) => (
            <div>{item.item}</div>
        ))}
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