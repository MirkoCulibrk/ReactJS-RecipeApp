import React, { useContext,useState } from 'react'
import Content from './UI/LeftContainer/Content';
import Axios from 'axios';
import {Container,Row} from 'react-bootstrap';
import {GlobalContext} from './Logic/GlobalState';

const Main = () => {
    const {ingredients,favorite}=useContext(GlobalContext);
    const [recipe,setRecipe]=useState('');
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    const [favoriteRecipes,setFavoriteRecipes]=useState(favorite);
    
    const mergedIngredients=ingredients.map((ingredient)=>{
        return ingredient.value;
    });
    const ingredientsFetch=mergedIngredients.join(',+');

    const fetchItems=async(e)=>{
        e.preventDefault();
        setLoading(true);
         try{
            const recepies= await Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsFetch}&number=5&apiKey=51eb63a4bcd24e4799b87c09af08d3dc`);
            const favoriteIds=favoriteRecipes.map(fave=>fave.id).join(', ');
            const filteredRecipes=recepies.data.filter(recipe=>!favoriteIds.includes(recipe.id));
            setRecipe(filteredRecipes);
            setLoading(false);
        }
        catch (error){
            console.log(error)
            setError(true);
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
                ></Content>
                </Row>
            </Container>
            
        </>
    )
}

export default Main
