const axios = require('axios')
const pokeDataDb = require('./utils')
const { Pokemon, Type } = require('../db');

const getPokemonsById = async (req, res) => {
    const { id } = req.params;
    try {
        if(id.length < 8){
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokeData = pokemon.data
            res.json({
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other['official-artwork'].front_default,
                height: pokeData.height,
                weight: pokeData.weight,
                hp: pokeData.stats.find((element) => element.stat.name === "hp").base_stat,
                attack: pokeData.stats.find((element) => element.stat.name === "attack")
                    .base_stat,
                defense: pokeData.stats.find((element) => element.stat.name === "defense")
                    .base_stat,
                speed: pokeData.stats.find((element) => element.stat.name === "speed")
                    .base_stat,
                types: pokeData.types.map((types) => types.type.name),
            })
        }else{
            const onePoke = await Pokemon.findOne({
                where:{
                    id
                },
                include: [{
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }]
            })
            res.json(pokeDataDb(onePoke))
            
        }
    } catch (error) {
        res.json({
            error: error.message
            })
        
    }
}
module.exports = getPokemonsById