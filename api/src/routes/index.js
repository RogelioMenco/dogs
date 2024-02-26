const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const router = Router();

function getBreeds() {
  let breedsAPI = axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(async function (response) {
      // Data de la API publica
      var breeds = response.data.map((breed) => ({
        id: breed.id,
        name: breed.name.toLowerCase(),
        weight: breed.weight.metric.replace('NaN - ', '').replace('NaN', '26'),
        height: breed.height.metric,
        life_span: breed.life_span,
        image: breed.image.url,
        temperament: breed.temperament,
        origin: 'api',
      }));

      // Data local
      const breedsFromDb = (
        await Dog.findAll({ include: 'temperaments' })
      )?.map((breed) => ({
        id: breed.id,
        name: breed.name,
        weight: breed.weight,
        height: breed.height,
        life_span: breed.life_span,
        image: breed.image,
        temperament: breed.temperaments
          ? breed.temperaments.map((e) => e.name).join(', ')
          : '',
        origin: breed.origin,
      }));

      return breeds
        .concat(breedsFromDb)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  return breedsAPI;
}

router.get('/dogs', function (req, res) {
  getBreeds()
    .then((allBreeds) => {
      // Busqueda de raza
      if (Object.prototype.hasOwnProperty.call(req.query, 'name')) {
        let { name } = req.query;

        let found = false;
        let breedsWithName = [];
        for (let i = 0; i < allBreeds.length; i++) {
          if (allBreeds[i].name.includes(name)) {
            breedsWithName.push(allBreeds[i]);
            found = true;
          }
        }
        if (found) {
          res.status(200).send(breedsWithName);
        } else {
          res.status(404).send('No se encontro la raza');
        }
      } else {
        res.json(allBreeds);
      }
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
    });
});

router.get('/dogs/:idRaza', function (req, res) {
  let { idRaza } = req.params;
  getBreeds().then((allBreeds) => {
    for (let j = 0; j < allBreeds.length; j++) {
      if (allBreeds[j].id == idRaza) {
        return res.json(allBreeds[j]);
      }
    }
    return res.status(404).send('No se encontro la raza');
  });
});

router.get('/temperament', async function (req, res) {
  let temps = await Temperament.findAll();

  if (temps.length > 0) {
    res.json(temps);
  } else {
    res.status(404).send('No se encontraron temperamentos');
  }
});

router.post('/dog', async function (req, res) {
  let { name, height, weight, lifeSpan, temps, image } = req.body;
  var arrTemps = [];
  if (!name || !height || !weight)
    return res.status(404).send('Error. Hay campos vacios');
  for (let i = 0; i < temps.length; i++) {
    let tempSearched = await Temperament.findOne({ where: { name: temps[i] } });
    if (tempSearched !== null) {
      arrTemps.push(tempSearched.dataValues.id);
    }
  }
  try {
    const dog = await Dog.create({
      name,
      weight,
      height,
      life_span: `${lifeSpan} years`,
      image,
      origin: 'db',
    });

    arrTemps.forEach(async (temp) => {
      await dog.addTemperaments(temp);
    });

    res.json(dog);
  } catch (e) {
    res.status(401).send('Ocurrion un error al crear', e);
  }
});
module.exports = router;
