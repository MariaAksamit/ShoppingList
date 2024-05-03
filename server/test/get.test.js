const request = require('supertest');
const app = require('../../server/app');
const { expect } = require('chai');

describe('Testy pre endpoint get', () => {
    it('Test pre endpoint pre vrátenie jedného záznamu', async () => {
        const res = await request(app).get('/shoppingList/get/9a100e1c');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object'); // Overenie, že odpoveď je objekt
        expect(res.body).to.have.property('id', '9a100e1c'); // Overenie, že odpoveď obsahuje očakávané vlastnosti
    });

    it('Test pre endpoint pre vrátenie neexistujúceho záznamu', async () => {
        const res = await request(app).get('/shoppingList/get/999');
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error'); // Overenie, že chybová odpoveď obsahuje očakávanú vlastnosť
    });

    it('Test pre endpoint s neplatným vstupom', async () => {
        const res = await request(app).get('/shoppingList/get/');
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errorMessage'); // Overenie, že chybová odpoveď obsahuje očakávanú vlastnosť
    });
});