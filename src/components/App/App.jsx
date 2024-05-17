import React, { useReducer } from 'react';
import './App.css';
import Header from '../commons/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from '../../routes/Routes';
import { ItemsContext, ItemsReducer } from "../../context/itemsContext";
import { AlertProvider } from '../../hooks/AlertProvider/AlertProvider';

function App() {

  const initialState = []
  const [items, dispatch] = useReducer(ItemsReducer, initialState);
  return (
    <div>
      <Router>
        <AlertProvider>
          <ItemsContext.Provider value={{ items, dispatch }}>
            <Header></Header>
            <AppRoutes></AppRoutes>
          </ItemsContext.Provider>
        </AlertProvider>
      </Router>
    </div>
  );
}

export default App;
