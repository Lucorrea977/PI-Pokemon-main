import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage/Landing";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import PokemonCreate from "./views/PokemonCreate/PokemonCreate";
import Detail from "./views/Detail/Detail";
import axios from "axios";
axios.defaults.baseURL = "https://pi-pokemon-main-39nz.onrender.com/"



function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<PokemonCreate />} />
      </Routes>
    </div>

  );
}

export default App;