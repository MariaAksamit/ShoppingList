import React, { useState, useEffect } from "react";
import Overview from "../bricks/Overview"


function OverviewR() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/shoppingList/list')
       .then(response => response.json())
       .then(data => setLists(data))
       .catch(error => console.error('Error fetching data:', error));

 }, []); 

  return (
    <div>
      <Overview lists={lists}/>
    </div>
  );
};

export default OverviewR;