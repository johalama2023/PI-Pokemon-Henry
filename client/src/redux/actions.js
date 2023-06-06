import axios from "axios";

import {
	GET_POKEMONS,
	GET_POKEMON_BY_ID,
	FILTER_DB,
	ORDER_BY_NAME,
	ORDER_BY_ATTACK,
	FILTER_API,
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

export function getPokemons() {
	return async function (dispatch) {
		let response = await axios.get("http://localhost:3001/pokemons");
		return dispatch({
			type: GET_POKEMONS,
			payload: response.data,
		});
	};
}

export const globalFilter =(filter)=>{
	return{
		type: GLOBAL_FILTER,
		payload: filter
	}
}

export const getPokemonById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(` http://localhost:3001/pokemons/${id}`);
			//console.log(response.data);
			return dispatch({
				type: GET_POKEMON_BY_ID,
				payload: response.data,
			});
		} catch (error) {
			return dispatch({
				type: "GET_POKEMON_BY_ID",
				payload: { error: "El pokemon no existe en la DB" },
			});
		}
	};
};

export function filterDb() {
	return {
		type: FILTER_DB,
	};
}

export const filterApi = () => {
	return {
		type: FILTER_API,
	};
};

export function orderByName(payload) {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
}

export function orderByAttack(payload) {
	return {
		type: ORDER_BY_ATTACK,
		payload,
	};
}
export function resetFilters() {
	return {
		type: RESET_FILTERS,
	};
}


export const getName = (name) => {
    return async (dispatch) => {
        try {
			//http://localhost:3001/pokemons/name?name=pikachu
			//http://localhost:3001/pokemons/name?name=${name}
			const { data } = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);
            dispatch({type: GET_NAME, payload: data })
        } catch (error) {
           return console.log('Probando')
        }
    }
}

export const backToHome =()=>{
	return{
		type: BACK_TO_HOME
	}
}

export function getTypes() {
	return async function (dispatch) {
		const response = await axios.get("http://localhost:3001/types");
		return dispatch({
			type: GET_TYPES,
			payload: response.data,
		});
	};
}

export function filterByTypes(payload) {
	return {
		type: FILTER_BY_TYPES,
		payload,
	};
}

export function postPokemon(payload) {
	return async function (dispatch) {
		try {
			const response = await axios.post(
				"http://localhost:3001/pokemons/",
				payload
			);
			return dispatch({
				type: POST_POKEMON,
				payload: response.data,
			});
		} catch (error) {
			throw error;
		}
	};
}


export function getDetail(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
			return dispatch({
				type: GET_DETAILS,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function searchPokemon(search) {
	return async function (dispatch) {
	  if (search.search(/^[a-zA-Zñáéíóúü]*$/)) {
		return alert("The name must only contain letters.");
	  }
	  await axios
		.get(`http://localhost:3001/pokemons/name?name=${search}`)
		.then((data) => {
		  return dispatch({
			type: SEARCH_POKEMON,
			payload: data.data,
		  });
		})
		.catch((error) => {
		  return dispatch({
			type: SEARCH_POKEMON,
			payload: error.name,
		  });
		});
	};
  }

export const deletePokemon = (id) => {
	return async (dispatch) => {
		try {
			const deleted = await axios.delete(
				`http://localhost:3001/pokemons/${id}`
			);
			dispatch({
				type: DELETE,
				payload: deleted.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};
