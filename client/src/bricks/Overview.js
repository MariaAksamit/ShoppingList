import React, { useState, useContext, useMemo } from "react";
import { Button, Form, Navbar, Pagination } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import styles from "../styles/styles.css";
import UserContext from "../Provider";
import Tile from "./Tile";
import ShoppingListCreate from "./ShoppingListCreate";

export default function Overview ({ lists }) {
  const [isModalShown, setShow] = useState(false);
  const {user, users, isLoggedIn} = useContext(UserContext);
  const [searchBy, setSearchBy] = useState("");
  const [showAllLists, setShowAllLists] = useState(true);

  const handleOpenModal = () => setShow(true);

  const filteredLists = showAllLists
  ? lists
  : lists.filter((list) => !list.archived);

  const filteredShoppingLists = useMemo(() => {
    const filteredList = filteredLists.filter((item) => {
      const ownerName = users.find(user => user.id === item.owner)?.name.toLowerCase() || ""; 
      const memberNames = item.members.map(memberId => users.find(user => user.id === memberId)?.name.toLowerCase()); 
      return (
        item.title.toLowerCase().includes(searchBy.toLowerCase()) ||
        ownerName.includes(searchBy.toLowerCase()) ||
        memberNames.some(memberName => memberName.includes(searchBy.toLowerCase())) 
      );
    });
    return filteredList;
  }, [filteredLists, searchBy]);

  function handleSearch(event) { 
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  };

  function handleSearchDelete(event) {   
    if (!event.target.value) setSearchBy(""); 
  };

  const toggleShowAllLists = () => {
    setShowAllLists((prevShowAllLists) => !prevShowAllLists);
  };

return (

<div>
  {isLoggedIn && 
    <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
            <Navbar.Brand style={{fontSize: "100%"}}>Overview of shopping lists</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  id={"searchInput"}
                  style={{ maxWidth: "150px" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearchDelete}
                />
                <Button
                  style={{ marginRight: "8px" }}
                  variant="outline-success"
                  type="submit"
                >
                <Icon size={1} path={mdiMagnify} />
                </Button>
              </Form>
              <Button 
                variant="secondary" 
                onClick={toggleShowAllLists}
              >
                {showAllLists ? "Active Lists" : "All Lists"}
              </Button>
              <ShoppingListCreate handleShowModal={handleOpenModal}/>            
            </Navbar.Collapse> 
        </div>
    </Navbar>
    }
<div className="overview">
  {isLoggedIn && (   
<div className="row">
    {filteredShoppingLists.map((list) => {
      if (user.id === list.owner || list.members.includes(user.id)) {
        return (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
            style={{ paddingBottom: "16px"}}
          >
            <Tile detail={list} users={users} lists={lists}/>
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