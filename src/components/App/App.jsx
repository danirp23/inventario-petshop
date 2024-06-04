import React, { useReducer } from 'react';
import './App.css';
import Header from '../commons/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AppRoutes from '../../routes/Routes';
import { CategoriesReducer, CategoryContext, ItemsContext, ItemsReducer } from "../../context/itemsContext";
import { AlertProvider } from '../../hooks/AlertProvider/AlertProvider';
import FooterPage from '../Footer/FooterPage';

function App() {

  const initialState = []
  const [items, dispatch] = useReducer(ItemsReducer, initialState);
  const [categoryDis, dispatchCategory] = useReducer(CategoriesReducer, initialState);
  return (
    <div className='app-container'>
      <Router>
        <AlertProvider>
          <ItemsContext.Provider value={{ items, dispatch }}>
            <CategoryContext.Provider value={{ categoryDis, dispatchCategory }}>
              <Header></Header>
              <AppRoutes></AppRoutes>
            </CategoryContext.Provider>
          </ItemsContext.Provider>
        </AlertProvider>
      </Router>
      <FooterPage />
    </div>
  );
}

export default App;
