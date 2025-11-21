const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('./test-db');
const Move = require('../models/Move');
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

describe('API Moves', () => {
    async function createBaseTypes() {
        const electric = await Type.create({name: 'Electrique', weaknesses: [], resistances: []});
        const water = await Type.create({name: 'Eau', weaknesses: [electric._id], resistances: []});
        const fire = await Type.create({name: 'Feu', weaknesses: [water._id], resistances: []});
        return { electric, water, fire };
    }

    it('POST /moves - crée une compétence', async () => {
        const { electric } = await createBaseTypes();
        
        const res = await request(app)
            .post('/moves')
            .send({name: 'Tonnerre', type: electric._id, description: "Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.", power: 90, accuracy: 100});

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Tonnerre');
        expect(res.body.type).toBe(electric._id.toString());
        expect(res.body.description).toBe("Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.");
        expect(res.body.power).toBe(90);
        expect(res.body.accuracy).toBe(100);

        const movesInDB = await Move.find();
        expect(movesInDB).toHaveLength(1);
    });

    it('GET /moves - retourne la liste des compétences', async () => {
        const { electric, water, fire } = await createBaseTypes();
        
        await Move.create({name: 'Tonnerre', type: electric._id, description: "Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.", power: 90, accuracy: 100});
        await Move.create({name: 'pistolet à O', type: water._id, description: "De l'eau est projetée avec force sur l'ennemi.", power: 40, accuracy: 100});
        await Move.create({name: 'Lance-Flammes', type: fire._id, description: "L'ennemi reçoit un torrent de flammes. Peut aussi le brûler.", power: 90, accuracy: 100});

        const res = await request(app).get('/moves');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(3);
    })

    it("GET /moves/:id - retourne les données de la compétence d'id :id", async () => {
        const { electric } = await createBaseTypes();

        const moveElectric = await Move.create({name: 'Tonnerre', type: electric._id, description: "Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.", power: 90, accuracy: 100});

        const res = await request(app).get(`/moves/${moveElectric._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(moveElectric._id.toString());
        expect(res.body.name).toBe('Tonnerre');
        expect(res.body.type).toBe(electric._id.toString());
        expect(res.body.description).toBe("Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.");
        expect(res.body.power).toBe(90);
        expect(res.body.accuracy).toBe(100);
    });

    it("PUT /moves/:id - modifie les données de la compétence d'id :id", async () => {
        const { electric } = await createBaseTypes();

        const moveElectric = await Move.create({name: 'Tonnerre', type: electric._id, description: "Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.", power: 90, accuracy: 100});

        const res = await request(app)
            .put(`/moves/${moveElectric._id}`)
            .send({power: 95, accuracy: 90});

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(moveElectric._id.toString());
        expect(res.body.name).toBe('Tonnerre');
        expect(res.body.type).toBe(electric._id.toString());
        expect(res.body.description).toBe("Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.");
        expect(res.body.power).toBe(95);
        expect(res.body.accuracy).toBe(90);
    });

    it("DELETE /moves/:id - supprime la compétence d'id :id", async () => {
        const { electric } = await createBaseTypes();

        const moveElectric = await Move.create({name: 'Tonnerre', type: electric._id, description: "Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.", power: 90, accuracy: 100});

        const res = await request(app).delete(`/moves/${moveElectric._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(moveElectric._id.toString());
        expect(res.body.name).toBe('Tonnerre');
        expect(res.body.type).toBe(electric._id.toString());
        expect(res.body.description).toBe("Une grosse décharge électrique tombe sur l'ennemi. Peut aussi le paralyser.");
        expect(res.body.power).toBe(90);
        expect(res.body.accuracy).toBe(100);

        const movesInDB = await Move.findById(moveElectric._id);
        expect(movesInDB).toBeNull();
    });
});