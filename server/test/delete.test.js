const request = require('supertest');
const app = require('../../server/app');
const { expect } = require('chai');

describe('Testy pre endpoint delete', () => {
    it('Test pre endpoint na zmazanie záznamu', async () => {
        const listId = 'ce711d9e'; // ID zoznamu, ktorý chceme zmazať
        const userId = 'someUserId'; // ID užívateľa, ktorý má právo zoznam zmazať

        const res = await request(app)
            .delete(`/shoppingList/delete/${listId}`)
            .send({ id: listId, userId });

        expect(res.status).to.equal(200);
        expect(res.body).to.be.empty;
    });
});