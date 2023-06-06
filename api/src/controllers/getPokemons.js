const axios = require('axios')
const { Pokemon, Type } = require('../db');
const pokeDataDb = require('./utils')

function pokeData(poke) {

    return {
        id: poke.data.id,
        name: poke.data.name,
        image: poke.data.sprites.other['official-artwork'].front_default,
        height: poke.data.height,
        weight: poke.data.weight,
        hp: poke.data.stats.find((element) => element.stat.name === "hp").base_stat,
        attack: poke.data.stats.find((element) => element.stat.name === "attack")
            .base_stat,
        defense: poke.data.stats.find((element) => element.stat.name === "defense")
            .base_stat,
        speed: poke.data.stats.find((element) => element.stat.name === "speed")
            .base_stat,
        types: poke.data.types.map((types) => types.type.name),
    };
}



const getPokemons = async (req, res) => {

    const dbPokemonsNofilter = await Pokemon.findAll({
        include: [{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }]
    })

    const apiPokemons = (
        await axios.get("https://pokeapi.co/api/v2/pokemon?limit=500")
    ).data.results;

    const pokeUrl = await Promise.all(
        apiPokemons.map(async (element) => {
            const response = await axios.get(element.url);
            return pokeData(response);
        })
    );
    const pokeDbFinally = dbPokemonsNofilter.map((pokeDataBase) => pokeDataDb(pokeDataBase))
    let result = [...pokeDbFinally, ...pokeUrl]
    res.status(200).json(result);
}
module.exports = getPokemons