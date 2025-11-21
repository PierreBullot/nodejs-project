const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Type = require('../models/Type');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('API Types', () => {
    it('POST /types - crée un type', async () => {
        const res = await request(app)
            .post('/types')
            .send({name: 'Normal', weaknesses: [], resistances: []});

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Normal');
        expect(res.body.weaknesses.length).toBe(0);
        expect(res.body.resistances.length).toBe(0);

        const typesInDB = await Type.find();
        expect(typesInDB).toHaveLength(1);
    });
    
    it('POST /types - échoue à créer un type avec de mauvaises données', async () => {
        const res = await request(app)
            .post('/types')
            .send({name: 'Normal', weaknesses: ["invalid item"], resistances: []});

        expect(res.statusCode).toBe(400);

        const typesInDB = await Type.find();
        expect(typesInDB).toHaveLength(0);
    });

    it('GET /types - retourne la liste des types', async () => {
        await Type.create({name: 'Vol', weaknesses: [], resistances: []});
        await Type.create({name: 'Eau', weaknesses: [], resistances: []});
        await Type.create({name: 'Feu', weaknesses: [], resistances: []});

        const res = await request(app).get('/types');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(3);
    })

    it("GET /types/:id - retourne les données de l'type d'id :id", async () => {
        const typeNormal = await Type.create({name: 'Normal', weaknesses: [], resistances: []});

        const res = await request(app).get(`/types/${typeNormal._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(typeNormal._id.toString());
        expect(res.body.name).toBe('Normal');
        expect(res.body.weaknesses).toHaveLength(0);
        expect(res.body.resistances).toHaveLength(0);
    });

    it("PUT /types/:id - modifie les données de l'type d'id :id", async () => {
        const typeNormal = await Type.create({name: 'Normal', weaknesses: [], resistances: []});

        const res = await request(app)
            .put(`/types/${typeNormal._id}`)
            .send({name: 'Normal', weaknesses: [typeNormal._id], resistances: [typeNormal._id]});

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Normal');
        expect(res.body.weaknesses).toHaveLength(1);
        expect(res.body.resistances).toHaveLength(1);
    });

    it("DELETE /types/:id - supprime l'type d'id :id", async () => {
        const typeNormal = await Type.create({name: 'Normal', weaknesses: [], resistances: []});

        const res = await request(app).delete(`/types/${typeNormal._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(typeNormal._id.toString());
        expect(res.body.name).toBe('Normal');
        expect(res.body.weaknesses).toHaveLength(0);
        expect(res.body.resistances).toHaveLength(0);

        const typesInDB = await Type.findById(typeNormal._id);
        expect(typesInDB).toBeNull();
    });
});