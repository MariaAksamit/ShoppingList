const request = require('supertest');
const app = require('../../server/app');

describe('Testy pre endpoint update', () => {
    test('Test pre endpoint na úpravu záznamu', async () => {
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

        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedData);
    });
    test('Test pre endpoint na úpravu záznamu - problémový scenár', async () => {
        const invalidData = {
            // Chýba povinné pole "id"
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
            .put('/shoppingList/update/invalidId')
            .send(invalidData);
    
        expect(res.status).toBe(400); // Očakáva sa status 400 - Bad Request
        expect(res.body).toEqual({ error: 'Invalid data: Missing required field: id' }); // Očakáva sa chybová správa
    });    
});