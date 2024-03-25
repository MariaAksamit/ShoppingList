import React, {useState, useContext} from "react";
import { Button, Row, Col, Form, Navbar, Pagination } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

import styles from "../styles/styles.css";
import UserContext from "../Provider";
import Tile from "./Tile";
import ShoppingListCreate from "./ShoppingListCreate";

export default function Overview ({ lists }) {
  const [isModalShown, setShow] = useState(false);
  const {user, users, isLoggedIn} = useContext(UserContext);

  const handleOpenModal = () => setShow(true);

return (

<div>
  {isLoggedIn && 
    <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
            <Navbar.Brand style={{fontSize: "100%"}}>Overview of shopping lists</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
              <ShoppingListCreate 
                handleShowModal={handleOpenModal}
              />            
            </Navbar.Collapse>
        </div>
    </Navbar>
    }
<div className="overview">
  {isLoggedIn && (   
<div className="row">
    {lists.map((list) => {
      if (user.id === list.owner || list.members.includes(user.id)) {
        return (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
            style={{ paddingBottom: "16px"}}
          >
            <Tile detail={list} users={users}/>
          </div>
          );
        }
      })}
          </div>
      )}
</div>
<div className="d-flex justify-content-center mt-3">
  
<Pagination>
    <Pagination.First />
    <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
    <Pagination.Next />
    <Pagination.Last />
</Pagination>
</div>
</div>
);
};