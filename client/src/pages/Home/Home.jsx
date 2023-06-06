import './Home.css';
import Card from '../../components/Card/Card';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const poke = useSelector(state => state.allPokemons);
  const pokeData = useSelector(state => state.pokeData);
  const pokemonsByName = useSelector(state => state.pokeByName);
  const filterApiDb = useSelector(state => state.globalFilter);
  const apiFilter = useSelector(state => state.pokeApi);
  const dbFilter = useSelector(state => state.pokeDb);
  const pokeFilterByTypes = useSelector(state => state.filterByType);
  const pokeOrderByName = useSelector(state => state.orderByname);
  const pokeOrderByAttack = useSelector(state => state.orderByAttack);
  const location = useLocation();

  let pokeRender = poke;

  const [page, setPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(12);
  const [fromDetail, setFromDetail] = useState(false); // Estado para controlar si se navegó desde el detalle
  const initialPoke = (page - 1) * pokePerPage;
  const finalPoke = page * pokePerPage;
  const maxPage = pokeRender && Math.ceil(pokeRender.length / pokePerPage);

  useEffect(() => {
    // Restablecer la página solo si se navegó desde el detalle o se realizó una búsqueda
    if (fromDetail || pokemonsByName.data) {
      setPage(1);
      setFromDetail(false); // Restablecer el estado a false
    }
  }, [fromDetail, pokemonsByName]);

  useEffect(() => {
    // Establecer fromDetail a true cuando se navega al detalle
    if (location.pathname.includes('/pokemon')) {
      setFromDetail(true);
    }
  }, [location.pathname]);

  if (filterApiDb.all) {
    if (pokeFilterByTypes.state) {
      pokeRender = pokeFilterByTypes.data;
    } else if (pokeOrderByName.state) {
      pokeRender = pokeOrderByName.data;
    } else if (pokeOrderByAttack.state) {
      pokeRender = pokeOrderByAttack.data;
    } else {
      pokeRender = poke;
    }
  }
  if (filterApiDb.api) {
    if (pokeFilterByTypes.state) {
      pokeRender = pokeFilterByTypes.data;
    } else if (pokeOrderByName.state) {
      pokeRender = pokeOrderByName.data;
    } else if (pokeOrderByAttack.state) {
      pokeRender = pokeOrderByAttack.data;
    } else {
      pokeRender = apiFilter;
    }
  }
  if (filterApiDb.db) {
    if (pokeFilterByTypes.state) {
      pokeRender = pokeFilterByTypes.data;
    } else if (pokeOrderByName.state) {
      pokeRender = pokeOrderByName.data;
    } else if (pokeOrderByAttack.state) {
      pokeRender = pokeOrderByAttack.data;
    } else {
      pokeRender = dbFilter;
    }
  }

  console.log('pokeRender', pokeRender);

  return (
    <div className="container__home">
      <div className="container__title__home">
        <h2 className="title__home">
          Welcome, Here you can find your favorite Pokemon
        </h2>
      </div>
      <div className="home__pagination__top">
        <Pagination page={page} maxPage={maxPage} setPage={setPage} />
      </div>
      <div className="container__pokemon__home">
        {pokeData === 'paginacion' ? (
          pokeRender
            .slice(initialPoke, finalPoke)
            .map((pokemon, index) => <Card key={index} poke={pokemon} />)
        ) : (
          <Card poke={pokemonsByName.data} />
        )}
      </div>
    </div>
  );
};

export default Home;
