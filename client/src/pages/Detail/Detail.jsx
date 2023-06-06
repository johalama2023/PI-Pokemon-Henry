import React from 'react';
import './Detail.css';
import NotFound from '../../components/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
	const pokeDetail = useSelector(state => state.details);
	const navigate = useNavigate();

	const handleClick =()=>{
		navigate('/pokemon')
	}
	

	if (!pokeDetail) {
		return <NotFound />;
	}
	return (
		<>
		{
			pokeDetail && pokeDetail.types?
			<div className='detail__container'>
			<div className="detail__main">
				<h2 className='detail__name'>{pokeDetail?.name}</h2>
				<h3 className='detail__id'>ID: {pokeDetail?.id}</h3>
				<div className="detail__header">
					<img className='detail__img' src={pokeDetail?.image} alt="" />
					<div className={`pokeid__bg ${pokeDetail?.types[0]}`} />
				</div>
				<div className="detail__stats__container">
					<h3 className='detail__text'>HP: {pokeDetail?.hp}/150</h3>
					<div className="detail__progress ">
						<div
							className={`detail__progress__fill ${pokeDetail?.types[0]}`}
							style={{ width: `${(pokeDetail?.hp / 150) * 100}%` }}
						></div>
					</div>
					<h3 className='detail__text'>Attack: {pokeDetail?.attack}/150</h3>
					<div className="detail__progress">
						<div
							className={`detail__progress__fill ${pokeDetail?.types[0]}`}
							style={{ width: `${(pokeDetail?.attack / 150) * 100}%` }}
						></div>
					</div>
					<h3 className='detail__text'>Defense: {pokeDetail?.defense}/150</h3>
					<div className="detail__progress">
						<div
							className={`detail__progress__fill ${pokeDetail?.types[0]}`}
							style={{ width: `${(pokeDetail?.defense / 150) * 100}%` }}
						></div>
					</div>
					<h3 className='detail__text'>Speed: {pokeDetail?.speed}/150</h3>
					<div className="detail__progress">
						<div
							className={`detail__progress__fill ${pokeDetail?.types[0]}`}
							style={{ width: `${(pokeDetail?.speed / 150) * 100}%` }}
						></div>
					</div>
				</div>
				<div className="detail__stats">
					<h3 className='detail__text'>Height: {pokeDetail?.height}</h3>
					<button onClick={handleClick} className='bth__detail'>Back</button>
					<h3 className='detail__text'>Weight: {pokeDetail?.weight}</h3>
				</div>
			</div>
		</div>
		:
		// <div>Loading...</div>
		null
		}
		
		</>
		
	);
}

export default Detail;
