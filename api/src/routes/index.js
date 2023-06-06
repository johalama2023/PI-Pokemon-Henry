const express = require("express");
const router = express.Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require("../controllers/getPokemons");
const getPokemonsById = require("../controllers/getPokemonsById");
const getPokemonByName = require("../controllers/getPokemonByName");
const createPokemon = require('../controllers/createPokemon')
const getTypes = require('../controllers/getTypes')



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemons);
router.get("/pokemons/name", getPokemonByName);
router.get("/pokemons/:id", getPokemonsById);
router.post('/pokemons/', createPokemon)
router.get('/types', getTypes)




module.exports = router;
