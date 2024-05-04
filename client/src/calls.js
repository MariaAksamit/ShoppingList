import { ListProvider } from './ListProvider';
import { UserProvider } from './UserProvider';

let useMock = false;



const Calls = async (url, requestData, method, errorCallback) => {
 if (useMock) {

    list(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/list");
      return Calls.call("get", commandUri, dtoIn);
    },
  
    create(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/create");
      return Calls.call("post", commandUri, dtoIn);
    },
  
    update(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/update");
      return Calls.call("post", commandUri, dtoIn);
    },
  
    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
  
    list(dtoIn) {
        const commandUri = Calls.getCommandUri("users/list");
        return Calls.call("get", commandUri, dtoIn);
      }
  }
}

const shoppingList = [
    {
      "id": "9a100e1c",
      "title": "Nákup na víkend",
      "owner": "069d7e0f",
      "members": ["07c6d1e2", "082b6d4a", "099e3a8b", "146f2e8b"],
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
          "amount": "0,5 kg",
          "state": false
        }
      ],
      "archived": true
    },
    {
      "id": "ce711d9e",
      "title": "Nákup na stretnutie temných lovcov",
      "owner": "114b1d9f",
      "members": ["069d7e0f", "10e6f8c7", "122f8c7a", "13d4a7e5"],
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
        },
        {
          "item": "Vodka",
          "amount": "1 fľaša",
          "state": false
        },
        {
          "item": "Stoličky",
          "amount": "20 ks",
          "state": false
        }
      ],
      "archived": false
    },
    {
      "id": "ccb08dd7",
      "title": "Nákup na Vianoce",
      "owner": "012f5e1c",
      "members": ["07c6d1e2", "10e6f8c7", "13d4a7e5", "155d7f9e", "02743d9e"],
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
        },
        {
          "item": "Moriak",
          "amount": "1 ks",
          "state": false
        },
        {
          "item": "Svetelná reťaz",
          "amount": "1 ks",
          "state": false
        }
      ],
      "archived": false
    },
];

const users = [
    {
      "id": "012f5e1c",
      "name": "Tessa Gray"
    },
    {
      "id": "02743d9e",
      "name": "William Herondale"
    },
    {
      "id": "03b0e8d7",
      "name": "Charlotte Branwell"
    },
    {
      "id": "041a3c9b",
      "name": "Jessamine Lovelace"
    },
    {
      "id": "05f7c4a9",
      "name": "Emma Carstairs"
    },
    {
      "id": "069d7e0f",
      "name": "Cassandra Clare"
    },
    {
      "id": "07c6d1e2",
      "name": "Jace Wayland"
    },
    {
      "id": "082b6d4a",
      "name": "Jocelyn Morgernstern"
    },
    {
      "id": "099e3a8b",
      "name": "Alec Lightwood"
    },
    {
      "id": "10e6f8c7",
      "name": "Clary Fairchild"
    },
    {
      "id": "114b1d9f",
      "name": "Hodge Starkweather"
    },
    {
      "id": "122f8c7a",
      "name": "Simon Lewis"
    },
    {
      "id": "13d4a7e5",
      "name": "Magnus Bane"
    },
    {
      "id": "146f2e8b",
      "name": "Isabelle Lightwood"
    },
    {
      "id": "155d7f9e",
      "name": "Aline Penhallow"
    }
  ]

export default Calls;