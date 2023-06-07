import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoSearch from '../../assets/img/logo-home.png';
import './SearchBar.css';

import {
	getName,
	searchPokemon,
	backToHome,
	globalFilter,
	filterApi,
	filterDb,
	filterByTypes,
	resetFilters,
	orderByAttack,
	orderByName,
	getPokemons,
} from '../../redux/actions';

const SearchBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const globalFiltered = useSelector((state) => state.globalFilter);
	const types = useSelector((state) => state.types);

	const handleEnter = (event) => {
		if (event.key === 'Enter') {
			let name = event.target.value;
			dispatch(getName(name.toLowerCase().trim()));
			dispatch(searchPokemon(name.toLowerCase().trim()));
		}
	};

	const handleClick = () => {
		navigate(`/create`);
	};

	const handleOnClick = () => {
		dispatch(backToHome());
	};
	const handleChange = (event) => {
		if (event.currentTarget.name === 'types') {
			const typesSearch = event.target.value;
			dispatch(filterByTypes(typesSearch));
		}
		if (event.currentTarget.name === 'names') {
			const nameSearch = event.target.value;
			dispatch(orderByName(nameSearch));
		}
		if (event.currentTarget.name === 'attack') {
			const attackSearch = event.target.value;
			dispatch(orderByAttack(attackSearch));
		}
	};

	const handleOnChange = (event) => {
		if (event.target.value === 'all') {
			dispatch(globalFilter({
				all: true,
				api: false,
				db: false,
			}));
			dispatch(resetFilters());
			dispatch(getPokemons());
			dispatch(backToHome());
			// Restablecer valores de los filtros
			document.getElementsByName('types')[0].selectedIndex = 0;
			document.getElementsByName('names')[0].selectedIndex = 0;
			document.getElementsByName('attack')[0].selectedIndex = 0;
		}
		if (event.target.value === 'api') {
			dispatch(globalFilter({
				all: false,
				api: true,
				db: false,
			}));
			dispatch(filterApi());
			dispatch(resetFilters());
			dispatch(backToHome());
		}
		if (event.target.value === 'db') {
			dispatch(globalFilter({
				all: false,
				api: false,
				db: true,
			}));
			dispatch(filterDb());
			dispatch(resetFilters());
			dispatch(backToHome());
		}
	};
	console.log(globalFiltered);
	return (
		<div className="container__searchBar">
			<img className="logo__searchBar" src={logoSearch} alt="" />
			<div className="form__searchBar">
				<div className="checked__filter__container">
					<div className="checked__searchBar">
						<h2 className="title__checked__searchBar">Origin</h2>
						<div className="check__info__searchBar">
							<label htmlFor="" className="label__searchBar">
								All Pokemons
							</label>
							<input
								type="checkbox"
								value="all"
								checked={globalFiltered.all}
								onChange={handleOnChange}
								className="check__searchBar"
							/>
						</div>
						<div className="check__info__searchBar">
							<label htmlFor="" className="label__searchBar">
								Api Pokemons
							</label>
							<input
								type="checkbox"
								value="api"
								checked={globalFiltered.api}
								onChange={handleOnChange}
								className="check__searchBar"
							/>
						</div>
						<div className="check__info__searchBar">
							<label htmlFor="" className="label__searchBar">
								DB Pokemons
							</label>
							<input
								type="checkbox"
								value="db"
								checked={globalFiltered.db}
								onChange={handleOnChange}
								className="check__searchBar"
							/>
						</div>
					</div>
					<div className="filter__searchBar">
						<h2 className="title__filter__searchBar">Filter</h2>
						<select name="types" className="select__searchBar" onChange={handleChange}>
							<option className="option__searchBar" value="">
								Select type
							</option>
							{types.map((type, index) => (
								<option className="option__searchBar" key={index} value={type.name}>
									{type.name}
								</option>
							))}
						</select>
						<h2 className="title__order__searchBar">Order</h2>
						<select name="names" className="select__searchBar" onChange={handleChange}>
							<option className="option__searchBar" value="">
								Order By Name
							</option>
							<option value="A" className="option__searchBar">
								Asc
							</option>
							<option value="D" className="option__searchBar">
								Des
							</option>
						</select>
						<select name="attack" className="select__searchBar" onChange={handleChange}>
							<option className="option__searchBar" value="">
								Order By Attack
							</option>
							<option value="A" className="option__searchBar">
								Asc
							</option>
							<option value="D" className="option__searchBar">
								Des
							</option>
						</select>
					</div>
				</div>
				<div className="intro__search">
					<input type="search" id="search" className="input__searchBar" onKeyUp={handleEnter} />
					<button onClick={handleClick} className="btn__create">
						Create
					</button>
					<button className="btn__create" onClick={handleOnClick}>
						Home
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
