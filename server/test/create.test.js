const request = require('supertest');
const app = require('../../server/app');
const { expect } = require('chai');

describe('Testy pre endpoint create', () => {
    it('Test pre endpoint na vytvorenie záznamu', async () => {
        const newData = {
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

        expect(res.status).to.equal(201);
       // Overenie, že vrátená odpoveď obsahuje ID nověho záznamu
       expect(res.body).to.have.property('id');
       // Overenie, že title, owner a minimálne jedna položka v items existujú
       expect(res.body.title).to.equal(newData.title);
       expect(res.body.owner).to.equal(newData.owner);
       expect(res.body.items).to.be.an('array').that.is.not.empty;
    });
});
