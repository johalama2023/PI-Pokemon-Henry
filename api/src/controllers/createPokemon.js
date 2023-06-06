const { Pokemon, Type } = require("../db");

const createPokemon = async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  try {
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types
    });

    newPokemon.addTypes(types);

    return res.status(200).json(newPokemon);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = createPokemon;
