const request = require('supertest');
const app = require('../../server/app');

describe('Testy pre endpoint get', () => {
    test('Test pre endpoint pre vrátenie jedného záznamu', async () => {
        const res = await request(app).get('/shoppingList/get/9a100e1c');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object'); // Overenie, že odpoveď je objekt
        expect(res.body).toHaveProperty('id', '9a100e1c'); // Overenie, že odpoveď obsahuje očakávané vlastnosti
    });

    test('Test pre endpoint pre vrátenie neexistujúceho záznamu', async () => {
        const res = await request(app).get('/shoppingList/get/999');
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error'); // Overenie, že chybová odpoveď obsahuje očakávanú vlastnosť
    });

    test('Test pre endpoint s neplatným vstupom', async () => {
        const res = await request(app).get('/shoppingList/get/');
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errorMessage'); // Overenie, že chybová odpoveď obsahuje očakávanú vlastnosť
    });
});