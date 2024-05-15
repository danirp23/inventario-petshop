import React from 'react';
import './App.css';

import animals from './data';
import AnimalCard from '../AnimalCard/AnimalCard';
import Header from '../commons/Header';
import "bulma/css/bulma.css"

function App() {
  return (
    <div>
      <Header></Header>
      {animals.map(animal =>
        <AnimalCard
          diet={animal.diet}
          key={animal.name}
          name={animal.name}
          size={animal.size}
	        scientificName={animal.scientificName}
        />
      )}
    </div>
  );
}

export default App;
