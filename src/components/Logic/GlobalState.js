import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  ingredients: JSON.parse(localStorage.getItem('ingredients')) || [],
  favorite:JSON.parse(localStorage.getItem('favorite')) || []

};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(state.ingredients));
    localStorage.setItem('favorite', JSON.stringify(state.favorite))
  }, [state.ingredients,state.favorite]);

  // Actions
  function deleteIngredient(id) {
    dispatch({
      type: 'DELETE_INGREDIENT',
      payload: id,
    });
  }
  function addIngredient(ingredient) {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: ingredient,
    });
  }
  function addFavorite(favorite) {
    dispatch({
      type: 'ADD_FAVORITE',
      payload: favorite,
    });
  }
  function deleteFavorite(id) {
    dispatch({
      type: 'DELETE_FAVORITE',
      payload: id,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        ingredients: state.ingredients,
        favorite: state.favorite,
        deleteIngredient,
        addIngredient,
        addFavorite,
        deleteFavorite,

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};