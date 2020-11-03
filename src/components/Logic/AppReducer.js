export default (state, action) => {
    switch (action.type) {
      case 'DELETE_INGREDIENT':
        return {
          ...state,
          ingredients: state.ingredients.filter(
            (ingredient) => {
           return  ingredient.id !== action.payload
            }
          ),
        };
      case 'ADD_INGREDIENT':
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
        };
        case 'ADD_FAVORITE':
        return {
          ...state,

          favorite: [...state.favorite, action.payload],
        };
        case 'DELETE_FAVORITE':
        return {
          ...state,
          favorite: state.favorite.filter(
            (favorite) => {
           return  favorite.id !== action.payload
            }
          ),
        };
    
      default:
        return state;
    }
  };