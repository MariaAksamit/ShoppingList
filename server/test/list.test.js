const request = require('supertest');
const app = require('../../server/app');

describe('Testy pre endpoint list', () => {
    test('Test pre endpoint na poskytnutie zoznamu', async () => {
        const res = await request(app).get('/shoppingList/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // Očakávame, že odpoveď bude pole
        expect(res.body.length).toBeGreaterThan(0); // Očakávame, že pole nebude prázdne
    });

    test('Test pre endpoint na poskytnutie zoznamu s určitým filtrom', async () => {
        const res = await request(app).get('/shoppingList/list?title=vikend');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Test pre endpoint na poskytnutie prázdneho zoznamu', async () => {
        const res = await request(app).get('/shoppingList/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0); // Očakávame, že pole bude mať dĺžku 0
    });
});