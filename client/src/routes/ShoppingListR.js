import React, {useContext} from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../UserProvider";
import ShoppingList from "../bricks/ShoppingList";
import App from "../App.css";


function ShoppingListR() {
   const {darkMode} = useContext(UserContext);
   const location = useLocation();
   const { lists, detail, ownerName, members } = location.state;

   return (
      <div className={darkMode ? "blackBgr" : ""}>
      <ShoppingList 
            lists= {lists} 
            detail={detail} 
            ownerName={ownerName} 
            members={members} 
         />
      </div>
   );
};

export default ShoppingListR;