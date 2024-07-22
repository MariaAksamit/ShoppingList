import './App.css';
import React, { useContext } from "react";
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from '@mdi/react' 
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from '@mdi/js';
import { useTranslation } from "react-i18next";
import UserContext from "./UserProvider";
import i18n from "./i18n";
import styles from "./styles/styles.css";

function App() {
  const {user, users, changeUser, darkMode, toggleDarkMode} = useContext(UserContext);
  const { t, i18n } = useTranslation();

  function lngChange(language) {
    i18n.changeLanguage(language);
  };

  return (
  <div className={`App ${darkMode ? 'dark' : ''}`}>

    <Navbar
      fixed="top"
      expand={"sm"}
      className="mb-3"
      bg={"purple"}
      variant={"dark"}
    >
    <Container fluid>
      <Navbar.Brand>  uuShoppingList  </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              uuShoppingList
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center">
                <NavDropdown 
                  title={user ? user.name : t("Unregistred")} 
                  id={darkMode ? "nav-dropdown-dark" : "nav-dropdown-light" }
                  menuVariant={darkMode ? "dark" : "light"}
                >
                  {users
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((user) => {
                      return (
                        <NavDropdown.Item onClick={() => changeUser(user.id)}>
                          {user.name}
                        </NavDropdown.Item>
                      )
                  })}
                </NavDropdown>
                <span className='me-3'></span>
                <NavDropdown 
                  title={i18n.language.toUpperCase()} 
                  id={darkMode ? "nav-dropdown-dark" : "nav-dropdown-light" }
                  menuVariant={darkMode ? "dark" : "light"}
                >  
                  <NavDropdown.Item onClick={() => lngChange("en")}>EN</NavDropdown.Item>  
                  <NavDropdown.Item onClick={() => lngChange("sk")}>SK</NavDropdown.Item>  
                </NavDropdown>
                <span className="me-2"></span>
                <Icon 
                  path={darkMode ? mdiMoonWaningCrescent : mdiWhiteBalanceSunny} 
                  style={{ cursor: 'pointer' }}
                  size={1} 
                  color={"white"}
                  onClick={toggleDarkMode}
                />                
                <Button 
                  variant={"outline-light"}
                  style={{ marginLeft: "30px" }}
                  onClick={() => changeUser(null)}
                >
                  Log out
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  
  <Outlet />
</div>
  );
}

export default App;