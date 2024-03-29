import React from "react";
import Overview from "../bricks/Overview"


function OverviewR() {
    const lists = [
        {
            "id": 123,
            "title": "Nákup na víkend",
            "owner": 1,
            "members": [2,3,4,10],
            "items": [
              {
                "item": "Mlieko",
                "amount": "2 litre",
                "state": false
              },
              {
                "item": "Chlieb",
                "amount": "1 ks",
                "state": false
              },
              {
                "item": "Jablká",
                "amount": "1 kg",
                "state": false
              }
            ],
            "archived": false,
        },
        {
            "id": 456,
            "title": "Nákup na stretnutie temných lovcov",
            "owner": 6,
            "members": [1,5,7,9],
            "items": [
              {
                "item": "Káva",
                "amount": "500 g",
                "state": false
              },
              {
                "item": "Čaj",
                "amount": "100 g",
                "state": false
              },
              {
                "item": "Papierové utierky",
                "amount": "1 balenie",
                "state": false
              }
            ],
            "archived": false,
        },
        {
            "id": 789,
            "title": "Nákup na Vianoce",
            "owner": 8,
            "members": [2,5,9,10,11],
            "items": [
              {
                "item": "Vianočný stromček",
                "amount": "1 ks",
                "state": false
              },
              {
                "item": "Vianočné ozdoby",
                "amount": "rôzne",
                "state": false
              },
              {
                "item": "Vianočné cukrovinky",
                "amount": "1 balenie",
                "state": false
              }
            ],
            "archived": false,

        },
        {
          "id": 111,
          "title": "Posledná večera",
          "owner": 3,
          "members": [2,4,8,10],
          "items": [
            {
              "item": "Kuracie stehná",
              "amount": "1 kg",
              "state": false
            },
            {
              "item": "Zemiaky",
              "amount": "2 kg",
              "state": false
            },
            {
              "item": "Paprika",
              "amount": "500 g",
              "state": false
            },
            {
              "item": "Víno",
              "amount": "1 fľaša",
              "state": false
            }
          ],
          "archived": false,
          },
          {
            "id": 222,
            "title": "Upratovanie",
            "owner": 3,
            "members": [1,7,9,11],
            "items": [
              {
                "item": "Bref",
                "amount": "1 ks",
                "state": false
              },
              {
                "item": "Sanytol",
                "amount": "2 ks",
                "state": false
              },
              {
                "item": "Handra",
                "amount": "3 kusy",
                "state": false
              },
              {
                "item": "Vedro",
                "amount": "1 ks",
                "state": false
              }
            ],
            "archived": true,
            }
    ];

    return (
        <div>
            <Overview lists={lists}/>
        </div>
    );
};

export default OverviewR;