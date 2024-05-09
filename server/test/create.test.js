const request = require('supertest');
const app = require('../../server/app');

describe('Testy pre endpoint na vytvorenie záznamu', () => {
    test('Happy day scenár - úspešné vytvorenie záznamu', async () => {    const newData = {
        "title": "Test zoznam",
        "owner": "069d7e0f",
        "members": ["07c6d1e2"],
        "items": [
            {
                "item": "Mlieko",
                "amount": "2 litre",
                "state": false
            }
        ],
        "archived": false
    };

        const res = await request(app)
            .post('/shoppingList/create')
            .send(newData);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual(newData.title);
        expect(res.body.owner).toEqual(newData.owner);
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.length).toBeGreaterThan(0);
    });

    test('Problémový scenár - chýbajúce povinné pole', async () => {
        const incompleteData = {
        // Chýba povinné pole "title"
        "owner": "069d7e0f",
        "members": ["07c6d1e2"],
        "items": [
            {
                "item": "Mlieko",
                "amount": "2 litre",
                "state": false
            }
        ],
        "archived": false
    };

        const res = await request(app)
            .post('/shoppingList/create')
            .send(incompleteData);

        expect(res.status).toBe(400); // Očakáva sa status 400 - Bad Request
        expect(res.body).toEqual({ error: 'Missing required field: title' }); // Očakáva sa chybová správa
    });
});