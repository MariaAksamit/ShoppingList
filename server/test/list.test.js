const request = require('supertest');
const app = require('../../server/app');
const { expect } = require('chai');

describe('Testy pre endpoint list', () => {
    it('Test pre endpoint na poskytnutie zoznamu', async () => {
        const res = await request(app).get('/shoppingList/list');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array'); // Očakáváme, že odpoveď bude pole
        expect(res.body).to.have.length.above(0); // Očakáváme, že pole nebude prázdne
    });

    it('Test pre endpoint na poskytnutie zoznamu s určitým filtrom', async () => {
        const res = await request(app).get('/shoppingList/list?title=vikend');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('Test pre endpoint na poskytnutie prázdneho zoznamu', async () => {
        const res = await request(app).get('/shoppingList/list');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(0); // Očakávame, že pole bude mať dĺžku 0
    });
});
