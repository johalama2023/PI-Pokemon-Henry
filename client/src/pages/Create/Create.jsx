import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { postPokemon, getTypes } from '../../redux/actions'
import "./Create.css";

const Create = () => {
	const [modalClose, setModalClose] = useState(true)
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const types = useSelector((state) => state.types);
	const [input, setInput] = useState({
		name: "",
		hp: 0,
		attack: 0,
		defense: 0,
		speed: 0,
		height: 0,
		weight: 0,
		image: "",
		types: [],
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});

		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleSelectType = (event) => {
		const selectedType = event.target.value;
		setInput((prevInput) => ({
			...prevInput,
			types: [...prevInput.types, selectedType],
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			types: "",
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(postPokemon(input));
		setModalClose(false);
	};

	const handleOptionsClick = (e) => {
		const typesId = e.target.value;
		const upTypes = input.types || [];
		if (!upTypes.includes(Number(typesId))) {
			let result = [...upTypes, Number(typesId)];
			result.pop();
			// se elimino la ultima posicion del arreglo para poder convertir el areglo a numero, ya no me permitia acceder a lo tipos por que estaban en string
			const finalResult = result.map((item) => Number(item))
			setInput({
				...input,
				types: finalResult,
			})
		}
	}


	const handleClick = (event) => {
		event.preventDefault();
		navigate("/pokemon")
	}


	const validate = (input) => {
		let errors = {};

		if (!input.name) {
			errors.name = "Name is required";
		}

		if (/\d/.test(input.name)) {
			errors.name = "Name cannot contain numbers";
		}

		if (input.hp < 1 || input.hp > 150) {
			errors.hp = "the value of life must be between 1 and 150";
		}

		if (input.attack < 1 || input.attack > 150) {
			errors.attack = "the value attack must be between 1 and 150";
		}

		if (input.defense < 1 || input.defense > 150) {
			errors.defense = "The value of defense  must be between 1 and 150";
		}

		if (input.image === "") {
			errors.image = "Image URL is required";
		}
		if (input.types) {
			errors.types = "Select a maximum of two types";
		}
		return errors;
	};
	useEffect(() => {
		const requiredFields = [
			"name",
			"hp",
			"attack",
			"defense",
			"speed",
			"height",
			"weight",
			"image",
			"types",
		];
		const allFieldsHaveValue = requiredFields.every((field) => input[field]);
		setButtonDisabled(!allFieldsHaveValue);
	}, [input])

	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch]);

	const goToHome = () => {
		navigate("/pokemon");
	};


	return (

		<div className='create__container'>
			<div className="create__main">
				<h1 className='create__title'>Create your Pokemon</h1>
				<form onSubmit={handleSubmit} className='create__form'>
					<div className='create__input__container'>
						<label className='create__label'>Name:</label>
						<input
							className='create__input'
							type={"text"}
							value={input.name}
							name="name"
							onChange={handleChange}
						/>
						{errors.name && <p className='create__error'>{errors.name}</p>}
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Life:</label>
						<input
							className='create__input'
							type={"number"}
							value={input.hp}
							name="hp"
							onChange={handleChange}
						/>
						{errors.hp && <p className='create__error'>{errors.hp}</p>}
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Attack:</label>
						<input
							className='create__input'
							type={"number"}
							value={input.attack}
							name="attack"
							onChange={handleChange}
						/>
						{errors.attack && <p className='create__error'>{errors.attack}</p>}
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Defense:</label>
						<input
							className='create__input'
							type={"number"}
							value={input.defense}
							name="defense"
							onChange={handleChange}
						/>
						{errors.defense && (
							<p className='create__error'>{errors.defense}</p>
						)}
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Speed:</label>
						<input
							className='create__input'
							type={"number"}
							value={input.speed}
							name="speed"
							onChange={handleChange}
						/>
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Height:</label>
						<input
							className='create__input'
							type={"number"}
							value={input.height}
							name="height"
							onChange={handleChange}
						/>
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Weight:</label>
						<input
							className='create__input'
							type={"number"}
							value={input.weight}
							name="weight"
							onChange={handleChange}
						/>
					</div>
					<div className='create__input__container'>
						<label className='create__label'>Image:</label>
						<input
							className='create__input'
							type={"text"}
							value={input.image}
							name="image"
							onChange={handleChange}
						/>
						{errors.image && <p className='create__error'>{errors.image}</p>}
					</div>
					<div className='create__input__container'>
						<label className='create__label'>types:</label>
						<input
							className='create__input'
							type={"text"}
							value={input.types.join(", ")}
							name="types"
							readOnly={true}
							onChange={handleChange}
						/>
						{errors.types && <p className='create__error'>{errors.types}</p>}
					</div>
					<select className='create__select' onChange={handleSelectType}>
						<option className='create__option' value="">
							Select type
						</option>{" "}
						{types.map((type, index) => (
							<option className='create__option' key={index} value={type.id} onClick={handleOptionsClick}>
								{type.name}
							</option>
						))}
					</select>
					<div className="create__btn__container">
						<button
							className='create__btn'
							type="submit"
							disabled={buttonDisabled}
						>
							Create
						</button>
						<button
							className='create__btn'
							type="submit"
							onClick={handleClick}
						>
							Back
						</button>
					</div>
				</form>
				<div className={`modal__create__content ${modalClose && 'modal__close'}`}>
					<div className="content__modal__create">
						<h2 className='title__modal__create'>Created!</h2>
						<button className='btn__modal__create' onClick={goToHome}>Go to home</button>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Create