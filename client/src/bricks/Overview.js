import React, { useState, useContext, useMemo } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import styles from "../styles/styles.css";
import UserContext from "../UserProvider";
import Tile from "./Tile";
import ShoppingListCreate from "./ShoppingListCreate";

export default function Overview ({ lists, onDeleteSuccess }) {
  const { t } = useTranslation();
  const [isModalShown, setShow] = useState(false);
  const {user, users, isLoggedIn, darkMode} = useContext(UserContext);
  const [searchBy, setSearchBy] = useState("");
  const [showActiveLists, setshowActiveLists] = useState(true);

  const handleOpenModal = () => setShow(true);

  const filteredLists = showActiveLists
  ? lists.filter((list) => !list.archived)
  : lists;

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

  const toggleshowActiveLists = () => {
    setshowActiveLists((prevshowActiveLists) => !prevshowActiveLists);
  };

   const handleDeleteSuccess = () => {
    onDeleteSuccess();
  }; 

return (

<div className={`App ${darkMode ? 'dark' : ''}`}>
  {isLoggedIn && 
    <Navbar collapseOnSelect expand="sm" bg={darkMode ? "dark" : "greenLight"} variant={darkMode ? "dark" : "light"}>
        <div className="container-fluid">
            <Navbar.Brand style={{fontSize: "100%"}}>{t("Overview of shopping lists")}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  id={"searchInput"}
                  style={{ maxWidth: "150px" }}
                  type="search"
                  placeholder={t("Search")}
                  aria-label="Search"
                  onChange={handleSearchDelete}
                />
                <Button
                  style={{ marginRight: "8px" }}
                  variant={darkMode ? "outline-light" : "outline-success"}
                  type="submit"
                >
                <Icon size={1} path={mdiMagnify} />
                </Button>
              </Form>
              <Button 
                variant={darkMode ? "outline-light" : "secondary"}
                onClick={toggleshowActiveLists}
              >
                {showActiveLists ? t("All Lists") : t("Active Lists")}
              </Button>
              <ShoppingListCreate handleShowModal={handleOpenModal}/>            
            </Navbar.Collapse> 
        </div>
    </Navbar>
    }
<div className={`overview ${darkMode ? 'dark-mode' : ''}`}>
  {isLoggedIn && lists.length ? (   
    <div className="container">
      <div className="row">
        {filteredShoppingLists.map((list) => {
          if (user.id === list.owner || list.members.includes(user.id)) {
            return (
              <div
                key={list.id}
                className={`col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 ${darkMode ? 'dark-mode' : 'light-mode'}`}            
                style={{ paddingBottom: "16px"}}
              >
                <Tile detail={list} users={users} lists={lists} onDeleteSuccess={handleDeleteSuccess} />
              </div>
            );
          }
        })}
      </div>
    </div>
  ) : (
    <div style={{ margin: "16px auto", textAlign: "center" }}>
      {isLoggedIn ? t("No shopping lists to display.") : t("Please log in to view your shopping lists.")}
    </div>
  )}
</div>

</div>
);
};