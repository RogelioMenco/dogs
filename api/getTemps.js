const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('./src/db.js')

module.exports.getTempsFromAPI = function getTempsFromAPI() {
    
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
          .then(async (response) => {
            let unfilteredTemps = response.data.map(breed => {
              if (breed.temperament !== undefined) {
                return breed.temperament.split(',')
              }
            })
            let unfilteredFlattenTemps = unfilteredTemps.flat()
            var filteredTemps = new Set();
            for (const temp in unfilteredFlattenTemps) {
              if (unfilteredFlattenTemps[temp] !== undefined) {
                filteredTemps.add(unfilteredFlattenTemps[temp].trim())
              }
            }
            filteredTemps = Array.from(filteredTemps)
           
            filteredTemps.forEach(temp => Temperament.create({name: temp}))
          })
         
        .catch((e) => {
          console.log(e)
        })
}