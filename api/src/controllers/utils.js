function pokeDataDb(pokeDb) {
    return {
        id: pokeDb.id,
        name: pokeDb.name,
        image: pokeDb.image,
        height: pokeDb.height,
        weight: pokeDb.weight,
        hp: pokeDb.hp,
        attack: pokeDb.attack,
        defense: pokeDb.defense,
        speed: pokeDb.speed,
        types: pokeDb.types.map((type) => type.name),
    };

}

module.exports = pokeDataDb