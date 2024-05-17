import React, { useReducer } from 'react';
import './App.css';
/* 
import animals from './data';
import AnimalCard from '../AnimalCard/AnimalCard';*/
import Header from '../commons/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from '../../routes/Routes';
import { ItemsContext, ItemsReducer } from "../../context/itemsContext";

function App() {

  const initialState = []
  const [items, dispatch] = useReducer(ItemsReducer, initialState);
  return (
    <div>
      <Router>
        <ItemsContext.Provider value={{items, dispatch}}>
          <Header></Header>
          <AppRoutes></AppRoutes>
        </ItemsContext.Provider>
      </Router>
      {/* 
      {animals.map(animal =>
        <AnimalCard
          diet={animal.diet}
          key={animal.name}
          name={animal.name}
          size={animal.size}
	        scientificName={animal.scientificName}
        />
      )} */}
    </div>
  );
}

export default App;
