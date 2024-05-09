const request = require('supertest');
const app = require('../../server/app');

describe('Testy pre endpoint delete', () => {
    test('Test pre endpoint na zmazanie záznamu - happy day scenár', async () => {
        const listId = 'ce711d9e'; // ID zoznamu, ktorý chceme zmazať
        const userId = 'someUserId'; // ID užívateľa, ktorý má právo zoznam zmazať

        const res = await request(app)
            .delete(`/shoppingList/delete/${listId}`)
            .send({ id: listId, userId });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({});
    });

    test('Test pre endpoint na zmazanie záznamu - problémový scenár', async () => {
        const nonExistentListId = 'nonExistentId'; // Neexistujúce ID zoznamu
        const userId = 'someUserId'; // ID užívateľa, ktorý má právo zoznam zmazať

        const res = await request(app)
            .delete(`/shoppingList/delete/${nonExistentListId}`)
            .send({ id: nonExistentListId, userId });

        expect(res.status).toBe(404); // Očakáva sa status 404 - Not Found
        expect(res.body).toEqual({ error: 'Record not found' }); // Očakáva sa chybová správa
    });
});