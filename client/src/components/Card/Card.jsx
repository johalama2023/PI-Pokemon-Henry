import { useNavigate } from 'react-router-dom'
import './Card.css'
import { useDispatch } from 'react-redux';
import { getDetail } from '../../redux/actions'

const Card = ({ poke }) => {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleclick = () => {
        dispatch(getDetail(poke.id))
        navigate(`/pokemon/${poke.id}`)
    }

    return (
        <div className="card__container">
            <article className="card__poke">
                <div className={`card__border ${poke?.types[0]}`}>
                    <div className='card__header__container'>
                        <header className='card__header'>
                            <div className={`card__bg ${poke?.types[0]}`}></div>
                            <img className="card__img" src={poke?.image} alt="" />
                        </header>
                    </div>
                    <body className='card__body'>
                        <h3 className="card__name">{poke?.name}</h3>
                        <h4 className="card__attack">Attack: {poke?.attack}</h4>
                        <ul className='card__types__container'>
                            {poke?.types.map((type, index) => {
                                return (
                                    <li className={`card__type ${type}`} key={index}>{type}</li>
                                )
                            })}
                        </ul>
                    </body>
                    <footer className='card__footer'>
                        <button className='card__btn' onClick={handleclick}>Detail</button>
                    </footer>
                </div>
            </article>
        </div>
    )
}

export default Card