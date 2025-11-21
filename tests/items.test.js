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

    it('GET /items - retourne la liste des objets', async () => {
        await Item.create({name: 'Pokeball', category: 'Capture', description: 'Capture un pokémon. Peu puissante.'});
        await Item.create({name: 'Superball', category: 'Capture', description: 'Capture un pokémon. Moyennement puissante.'});
        await Item.create({name: 'Hyperball', category: 'Capture', description: 'Capture un pokémon. Très puissante.'});

        const res = await request(app).get('/items');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(3);
    })

    it("GET /items/:id - retourne les données de l'objet d'id :id", async () => {
        const pokeball = await Item.create({name: 'Pokeball', category: 'Capture', description: 'Capture un pokémon. Peu puissante.'});

        const res = await request(app).get(`/items/${pokeball._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(pokeball._id.toString());
        expect(res.body.name).toBe('Pokeball');
        expect(res.body.category).toBe('Capture');
        expect(res.body.description).toBe('Capture un pokémon. Peu puissante.');
    });

    it("PUT /items/:id - modifie les données de l'objet d'id :id", async () => {
        const pokeball = await Item.create({name: 'Pokeball', category: 'Capture', description: 'Capture un pokémon. Peu puissante.'});

        const res = await request(app)
            .put(`/items/${pokeball._id}`)
            .send({name: 'Superball', category: 'Capture', description: 'Capture un pokémon. Moyennement puissante.'});

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Superball');
        expect(res.body.category).toBe('Capture');
        expect(res.body.description).toBe('Capture un pokémon. Moyennement puissante.');
    });

    it("DELETE /items/:id - supprime l'objet d'id :id", async () => {
        const pokeball = await Item.create({name: 'Pokeball', category: 'Capture', description: 'Capture un pokémon. Peu puissante.'});

        const res = await request(app).delete(`/items/${pokeball._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(pokeball._id.toString());
        expect(res.body.name).toBe('Pokeball');
        expect(res.body.category).toBe('Capture');
        expect(res.body.description).toBe('Capture un pokémon. Peu puissante.');

        const itemsInDB = await Item.findById(pokeball._id);
        expect(itemsInDB).toBeNull();
    });
});