const request = require('supertest');
const app = require('../../server/app');
const { expect } = require('chai');

describe('Testy pre endpoint update', () => {
    it('Test pre endpoint na úpravu záznamu', async () => {
        const updatedData = {
            "id": "ccb08dd7",
            "title": "Nový názov",
            "owner": "069d7e0f",
            "members": ["07c6d1e2", "09876543"],
            "items": [
                {
                  "item": "Zmena v položke",
                  "amount": "amount",
                  "state": true
                }
            ],
            "archived": false
        };

        const res = await request(app)
            .put('/shoppingList/update/ccb08dd7')
            .send(updatedData);

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(updatedData);
    });
});