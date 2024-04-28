import React, {useContext, ude} from "react";
import { useLocation } from "react-router-dom";
import { useList } from "../ListProvider"
import UserContext from "../UserProvider";
import ShoppingList from "../bricks/ShoppingList";
import App from "../App.css";


function ShoppingListR() {
   const {darkMode} = useContext(UserContext);
   const { fetchList } = useList();
   const location = useLocation();
   const { detail, ownerName, members } = location.state;

   const updateList = () => {
      fetchList(); 
    };

   return (
      <div className={darkMode ? "blackBgr" : ""}>
      <ShoppingList 
            detail={detail} 
            ownerName={ownerName} 
            members={members} 
            onUpdateSuccess={updateList}
         />
      </div>
   );
};

export default ShoppingListR;