import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage/Landing";
import Home from "./views/Home/Home";
import PokemonCreate from "./views/Form/PokemonCreate";
import Detail from "./views/Detail/Detail";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:3001/`



function App() {
  return (

    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path='/create' element={<PokemonCreate />} />
      </Routes>
    </div>

  );
}

export default App;