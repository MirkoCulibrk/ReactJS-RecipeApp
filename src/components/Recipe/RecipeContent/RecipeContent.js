import React from 'react'
import './RecipeContent.scss';
import MissingIngredientsList from '../../missingIngredients/MissingIngredientsList';
const RecipeContent = ({recipeData,missingFoodIngredients}) => {
    const{ image,title,sourceUrl,creditsText, extendedIngredients,analyzedInstructions}=recipeData;
    return (
        <>
            <div className="img-container">
                <img src={image} alt={title}></img> 
            </div>
            <div className="text-container">
                <h2>{title}</h2>
                {creditsText?<p>From <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{creditsText}</a></p>:null} 
            </div>
            <div className="ingredient-container">
                <h3>Ingredients</h3>
                <ul>
                    {extendedIngredients.map((ingredient,index)=>{
                        return(
                            <li className="ingredient-list" key={index}>
                                {ingredient.original}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="missing-ingredients">
                    {missingFoodIngredients.length?(
                        <>
                            <h3>Missing Ingredient</h3>
                                <p>
                                
                                <MissingIngredientsList missingIngredients={missingFoodIngredients}></MissingIngredientsList>
                                </p>
                        </>
                    ):null}
            </div>
            <div className="instruction-container">
                {analyzedInstructions.length>0?(
                    <>
                        <h3>Instructions</h3>
                        <ul>
                            {analyzedInstructions[0].steps.map((step,index)=>{
                                return(
                                    <li key={index}>
                                        <div className="circle">
                                            <span >{step.number}</span>
                                        </div>
                                        <span className="text">{step.step}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                ):(
                    <a href={sourceUrl} target="blank" className="btn-fetch">Click for Instructions</a>
                )}
            </div>
        </>
    )
}

export default RecipeContent
