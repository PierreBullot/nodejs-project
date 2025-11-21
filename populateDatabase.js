const mongoose = require('mongoose');
const Fleur = require('./models/Fleur');
const Bouquet = require('./models/Bouquet');

const MONGO_URI = 'mongodb://127.0.0.1:27017/flower-shop';

async function main() {
  try {
    console.log('Connexion à MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connecté à MongoDB');

    // On supprime toute la base de données
    console.log('Suppression des anciennes données...');
    await Fleur.deleteMany({});
    await Bouquet.deleteMany({});

    // ---------- FLEURS ----------
    console.log('Insertion des fleurs...');

    const fleursData = [
      { name: 'Rose',   color: 'rouge',  price: 5 },
      { name: 'Rose', color: 'blanc',  price: 4.5 },
      { name: 'Tulipe', color: 'jaune',  price: 3.5 },
      { name: 'Lys',    color: 'blanc',  price: 6 },
      { name: 'Gerbera', color: 'orange', price: 4 },
      { name: 'Pivoine', color: 'rose',  price: 7 },
    ];

    const fleurs = await Fleur.insertMany(fleursData);

    console.log(`${fleurs.length} fleurs insérées.`);
    fleurs.forEach(f => console.log(` - ${f.name} (${f.color}) : ${f.price}€ [${f._id}]`));

    const findFleur = (name, color) => fleurs.find(f => f.name === name && f.color === color);

    // ---------- BOUQUETS ----------
    console.log('\nInsertion des bouquets...');

    const bouquetsData = [
      {
        name: 'Bouquet Romantique',
        description: 'Un bouquet classique de roses rouges et blanches.',
        price: 45,
        fleurs: [
          findFleur('Rose', 'rouge')._id,
          findFleur('Rose', 'rouge')._id,
          findFleur('Rose', 'rouge')._id,
          findFleur('Rose', 'blanc')._id,
          findFleur('Rose', 'blanc')._id,
        ]
      },
      {
        name: 'Bouquet Printanier',
        description: 'Un mélange frais de tulipes, gerberas et pivoines.',
        price: 55,
        fleurs: [
          findFleur('Tulipe', 'jaune')._id,
          findFleur('Tulipe', 'jaune')._id,
          findFleur('Gerbera', 'orange')._id,
          findFleur('Gerbera', 'orange')._id,
          findFleur('Pivoine', 'rose')._id,
        ]
      },
      {
        name: 'Bouquet Élégant',
        description: 'Lys blancs et roses blanches pour une composition élégante.',
        price: 60,
        fleurs: [
          findFleur('Lys', 'blanc')._id,
          findFleur('Lys', 'blanc')._id,
          findFleur('Rose', 'blanc')._id,
          findFleur('Rose', 'blanc')._id,
        ]
      }
    ];

    const bouquets = await Bouquet.insertMany(bouquetsData);

    console.log(`${bouquets.length} bouquets insérés.`);
    bouquets.forEach(b => console.log(` - ${b.name} : ${b.price}€ [${b._id}]`));

    console.log('\nJeu de tests inséré avec succès !');

  } catch (err) {
    console.error('Erreur lors du seed :', err);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB.');
    process.exit(0);
  }
}

main();