import React from "react";
import Detail from "../bricks/Detail.js";


function ShopingList() {
  const detail = {
        "id": 123,
        "title": "Nákup na víkend",
        "owner": {
          "id": 1,
          "name": "Cassandra Clare",
        },
        "members": [
          {
            "id": 2,
            "name": "Jace Wayland",
          },
          {
            "id": 3,
            "name": "Jocelyn Morgernstern",
          },
          {
            "id": 4,
            "name": "Alec Lightwood",
          }
        ],
        "items": [
          {
            "id": 5,
            "item": "Mlieko",
            "amount": "2 litry",
            "state": false
          },
          {
            "id": 6,
            "item": "Chlieb",
            "amount": "1 ks",
            "state": false
          },
          {
            "id": 7,
            "item": "Jablká",
            "amount": "1 kg",
            "state": false
          }
        ]
      };
     
    return (
        <div>
            <Detail 
              detail={detail}
            />
        </div>
    );
};

export default ShopingList;