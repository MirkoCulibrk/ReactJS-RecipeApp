import React, { useContext, useState } from 'react'
import './Recipe.scss';
import {Col} from 'react-bootstrap';
import { GlobalContext } from '../../Logic/GlobalState';
import Hearth from '../../Favorite/FavoriteRecipe';
import expandIcon from '../../../images/expandicon.svg';
import closeIcon from '../../../images/close.svg';
import Popup from 'reactjs-popup';
import axios from 'axios';
import RecipeContent from '../RecipeContent/RecipeContent';
import warningIcon from '../../../images/warning.svg';
import Error from '../../Error/Error';
const Recipe = ({src,id,title,missingFoodIngredients}) => {
    const {ingredients}=useContext(GlobalContext);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [open,setOpen]=useState(false);
    const [recipe,setRecipe]=useState({});

    const openPopUp= async() =>{
        setLoading(true);
        setOpen(true);
        setError(false);
        try{
            const results=await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_UNSPLASH_KEY}`);
            setRecipe(results.data);
            setLoading(false);
        }
        catch(error){
            setError(true);
            setLoading(false);
        }
    }
    const ingredientAdded=missingFoodIngredients.filter(missingIngredient=>{
        return(
            ingredients.filter(ingredient=>{
                return ingredient.value===missingIngredient.name;
            }).length===0
        );
    });
    let recipeCardContent;
    if(loading){
        recipeCardContent=<div></div>
    }else if(error){
        recipeCardContent=<Error></Error>
    }else{
        recipeCardContent=(
            <RecipeContent recipeData={recipe} missingFoodIngredients={ingredientAdded}></RecipeContent>
        )
    }
    return (
        <>
            <Col lg="4">
                <div className="recipeCard">
                    <div className="hearth-container">
                        <Hearth src={src} id={id} title={title} missedFood={missingFoodIngredients}></Hearth>
                    </div>
                    <div className="img-container">
                        <img src={src} alt={`Recipe number-${id}` }></img>
                        
                        <div className="popup" onClick={openPopUp}>
                            <img src={expandIcon} alt="expand icon"></img>
                        </div>
                    </div>
                    <div className="title-container">
                        <h5 className="text-center">{title}</h5>
                        {ingredientAdded.length?(
                                 <>
                                    <div>
                                        <img src={warningIcon} className="img" alt="warning icon"></img>
                                        <p className="text-center">missing {ingredientAdded.length} ingredient{ingredientAdded.length === 1 ? null:'s'}</p>
                                    </div>
                                    </>
                                ):null}
                            
                            

                        </div>
                </div>
            </Col>
            <Popup open={open} closeOnDocumentClick  onClose={()=>setOpen(false)}>
                <div className="hearth-container">
                    <Hearth id={id} title={title} src={src}></Hearth>
                </div>
                <div className="close-container">
                    <div className="popup" onClick={()=>setOpen(false)}>
                        <img src={closeIcon}  alt="close icon"></img>
                    </div>
                </div>
             
                {recipeCardContent}
            </Popup>
        </>
    )
}

export default Recipe
