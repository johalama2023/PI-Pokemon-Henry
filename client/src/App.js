import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Create from "./pages/Create/Create";
import NotFound from "./components/NotFound/NotFound";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getPokemons, getTypes } from "./redux/actions";

function App() {
  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(()=>{
    if(location.pathname === '/pokemon'){
      dispatch(getPokemons())
      dispatch(getTypes())
    }
  },[dispatch, location])




  return (
    <div className="App">
      {
        location.pathname === "/pokemon" && <Nav />
      }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pokemon" element={<Home />} />
        <Route path="/pokemon/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
