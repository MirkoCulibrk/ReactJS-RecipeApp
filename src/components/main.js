import React, { useContext,useState } from 'react'
import Content from './UI/LeftContainer/Content';
import Axios from 'axios';
import {Container,Row} from 'react-bootstrap';
import {GlobalContext} from './Logic/GlobalState';

const Main = () => {
    const {ingredients,favorite}=useContext(GlobalContext);
    const [recipe,setRecipe]=useState([]);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    const [favoriteRecipes,setFavoriteRecipes]=useState(favorite||[]);
    const [message,setMessage]=useState(favorite.length?'':'Add ingredients then click "Find Recipes". Try to add as many ingredients as you can for better results.')
    
    const mergedIngredients=ingredients.map((ingredient)=>{
        return ingredient.value;
    });
    const ingredientsFetch=mergedIngredients.join(',+');

    const fetchItems=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setMessage('');
         try{
            const recepies= await Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsFetch}&number=5&apiKey=${process.env.REACT_APP_UNSPLASH_KEY}`);
            setFavoriteRecipes(favorite);
            const favoriteIds=favoriteRecipes.map(fave=>fave.id).join(', ');
            const filteredRecipes=recepies.data.filter(recipe=>
                !favoriteIds.includes(recipe.id)
            );
            setRecipe(filteredRecipes);
            setLoading(false);
        }
        catch (error){
            setError(true);
            setMessage('Sorry, we have hit our limit for requests for the day. Please try again tomorrow.')
        }
    }    
    return (
        <>
            <Container fluid>
                <Row>
                <Content api_call={fetchItems} 
                loading={loading}
                recepies={recipe}
                favoriteRecipes={favoriteRecipes}
                message={message}
                ></Content>
                </Row>
            </Container>
            
        </>
    )
}

export default Main
