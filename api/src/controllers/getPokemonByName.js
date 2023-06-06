const axios = require('axios');
const pokeDataDb = require('./utils');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');

const getPokemonsByName = async (req, res) => {
	const { name } = req.query;
	try {
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${name}`
		)
		const pokemonByApi = response.data

		if (pokemonByApi) {
			const pokemon = {
				id: pokemonByApi.id,
				name: pokemonByApi.name,
				image: pokemonByApi.sprites.other['official-artwork'].front_default,
				height: pokemonByApi.height,
				weight: pokemonByApi.weight,
				hp: pokemonByApi.stats.find((element) => element.stat.name === "hp").base_stat,
				attack: pokemonByApi.stats.find((element) => element.stat.name === "attack")
					.base_stat,
				defense: pokemonByApi.stats.find((element) => element.stat.name === "defense")
					.base_stat,
				speed: pokemonByApi.stats.find((element) => element.stat.name === "speed")
					.base_stat,
				types: pokemonByApi.types.map((types) => types.type.name),
			}
			res.status(200).json(pokemon)
		} 
	} catch (error) {
		const pokemonByNameDB = await Pokemon.findOne({
			where: {
				name: name
			},
			include: [
				{
					model: Type,
					attributes: ["name"]
				}
			],
		});
	

		if (pokemonByNameDB.length === 0) {
			return res.status(404).send('No se encontro el pokemon')
		} else {
			return res.status(200).json(pokeDataDb(pokemonByNameDB))
		}
	}
}

module.exports = getPokemonsByName;

