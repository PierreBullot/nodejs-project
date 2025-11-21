const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Item = require('../models/Item');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('API Items', () => {
    it('POST /items - crée un objet', async () => {
        const res = await request(app)
            .post('/items')
            .send({name: 'Pokeball', category: 'Capture', description: 'Capture un pokémon. Peu puissante.'});

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Pokeball');
        expect(res.body.category).toBe('Capture');
        expect(res.body.description).toBe('Capture un pokémon. Peu puissante.');

        const itemsInDB = await Item.find();
        expect(itemsInDB).toHaveLength(1);
    });
});