import React from "react";
import { useLocation } from "react-router-dom";
import ShoppingList from "../bricks/ShoppingList";

function ShoppingListR() {
    const location = useLocation();
    const { detail, ownerName, members } = location.state;

    return (
        <div>
          <ShoppingList detail={detail} ownerName={ownerName} members={members} />
       </div>
    );
};

export default ShoppingListR;