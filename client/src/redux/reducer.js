import {
	GET_POKEMONS,
	GET_POKEMON_BY_ID,
	FILTER_API,
	FILTER_DB,
	ORDER_BY_NAME,
	ORDER_BY_ATTACK,
	GET_NAME,
	GET_TYPES,
	POST_POKEMON,
	FILTER_BY_TYPES,
	GET_DETAILS,
	SEARCH_POKEMON,
	BACK_TO_HOME,
	DELETE,
	GLOBAL_FILTER,
	RESET_FILTERS
} from "./actions.types.js";

const initialState = {
	pokemons: [],
	allPokemons: [],
	pokeApi: [],
	pokeDb: [],
	types: [],
	details: [],
	pokeSearch: [],
	filterType: '',
	pokeData: "paginacion",
	globalFilter: {
		all: true,
		api: false,
		db: false
	},
	pokeByName: {
		state: false,
		data: []
	},
	filterByType: {
		state: false,
		data: []
	},
	orderByname: {
		state: false,
		data: []
	},
	orderByAttack: {
		state: false,
		data: []
	}
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case RESET_FILTERS:
			return {
				...state,
				pokeByName: {
					state: false,
					data: []
				},
				filterByType: {
					state: false,
					data: []
				},
				orderByname: {
					state: false,
					data: []
				},
				orderByAttack: {
					state: false,
					data: []
				}
			};
		case GET_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload,
			};

		case GLOBAL_FILTER:
			return {
				...state,
				globalFilter: action.payload,
			}
		case GET_POKEMON_BY_ID:
			return {
				...state,
				pokemonDetail: action.payload,
			};
		case FILTER_API:
			return {
				...state,
				pokeApi: state.allPokemons.filter(pokemon => typeof pokemon.id === 'number')
			};

		case FILTER_DB:
			return {
				...state,
				pokeDb: state.allPokemons.filter(pokemon => typeof pokemon.id === 'string')
			};

		case ORDER_BY_NAME:
			let sortedArr;
			if (state.globalFilter.all) {
				sortedArr = action.payload === "A"
					? state.pokemons.sort(function (a, b) {
						if (a.name > b.name) {
							return 1;
						}
						if (b.name > a.name) {
							return -1;
						}
						return 0;
					})
					: state.pokemons.sort(function (a, b) {
						if (a.name > b.name) {
							return -1;
						}
						if (b.name > a.name) {
							return 1;
						}
						return 0;
					});
			}
			if (state.globalFilter.api) {
				sortedArr = action.payload === "A"
					? state.pokeApi.sort(function (a, b) {
						if (a.name > b.name) {
							return 1;
						}
						if (b.name > a.name) {
							return -1;
						}
						return 0;
					})
					: state.pokeApi.sort(function (a, b) {
						if (a.name > b.name) {
							return -1;
						}
						if (b.name > a.name) {
							return 1;
						}
						return 0;
					});
			}
			if (state.globalFilter.db) {
				sortedArr = action.payload === "A"
					? state.pokeDb.sort(function (a, b) {
						if (a.name > b.name) {
							return 1;
						}
						if (b.name > a.name) {
							return -1;
						}
						return 0;
					})
					: state.pokeDb.sort(function (a, b) {
						if (a.name > b.name) {
							return -1;
						}
						if (b.name > a.name) {
							return 1;
						}
						return 0;
					});
			}
			return {
				...state,
				filterByType: {
					state: false,
					data: []
				},
				orderByname: {
					state: true,
					data: sortedArr
				},
				orderByAttack: {
					state: false,
					data: []
				},
				pokeByName:{
					state:false,
					data:[]
				}
			};

		case ORDER_BY_ATTACK:
			let sortedAttack;
			if(state.globalFilter.all){
				sortedAttack = action.payload === "A"
					? state.pokemons.sort(function (a, b) {
						return a.attack - b.attack;
					})
					: state.pokemons.sort(function (a, b) {
						return b.attack - a.attack;
					});
			}
			if(state.globalFilter.api){
				sortedAttack = action.payload === "A"
					? state.pokeApi.sort(function (a, b) {
						return a.attack - b.attack;
					})
					: state.pokeApi.sort(function (a, b) {
						return b.attack - a.attack;
					});
			}
			if(state.globalFilter.db){
				sortedAttack = action.payload === "A"
					? state.pokeDb.sort(function (a, b) {
						return a.attack - b.attack;
					})
					: state.pokeDb.sort(function (a, b) {
						return b.attack - a.attack;
					});
			}
				
			return {
				...state,
				filterByType: {
					state: false,
					data: []
				},
				orderByname: {
					state: false,
					data: []
				},
				orderByAttack: {
					state: true,
					data: sortedAttack
				},
				pokeByName:{
					state:false,
					data:[]
				}
				
			};


		case GET_NAME:
			return {
				...state,
				pokeByName: {
					state: true,
					data: action.payload
				}
			};
		case SEARCH_POKEMON:
			console.log("Search", SEARCH_POKEMON);
			return {
				...state,
				pokeSearch: action.payload,
				pokeData: "search"
			};
		case BACK_TO_HOME:
			return {
				...state,
				pokeSearch: action.payload,
				pokeData: "paginacion"
			};


		case POST_POKEMON:
			return {
				...state,
				pokemons: [...state.pokemons, action.payload],
			};

		case FILTER_BY_TYPES:
			let filteredArr;
			if(state.globalFilter.all) filteredArr = state.allPokemons.filter(poke=>poke.types.includes(action.payload))
			if(state.globalFilter.api) filteredArr = state.pokeApi.filter(poke=>poke.types.includes(action.payload))
			if(state.globalFilter.db) filteredArr = state.pokeDb.filter(poke=>poke.types.includes(action.payload))
			return {
				...state,

				filterByType: {
					state: true,
					data: filteredArr
				},
				orderByname: {
					state: false,
					data: []
				},
				orderByAttack: {
					state: false,
					data: []
				},
				pokeByName:{
					state:false,
					data:[]
				}
			};

		case GET_TYPES:
			return {
				...state,
				types: action.payload,
			};

		case GET_DETAILS:
			return {
				...state,
				details: action.payload,
			};
		case DELETE:
			return {
				...state,
				pokemons: state.pokemons.filter(
					(pokemon) => pokemon.id !== action.payload
				),
				filteredPokemons: state.filteredPokemons.filter(
					(pokemon) => pokemon.id !== action.payload
				),
			};

		default:
			return state;
	}
}

export default reducer;
