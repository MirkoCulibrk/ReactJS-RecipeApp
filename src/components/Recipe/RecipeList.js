import React, { Fragment } from 'react'
import Recipe from './Recipecard/Recipe';
import './RecipeList.scss';
const RecipeList = ({recepies,loading,favoriteRecipes}) => {
    console.log(favoriteRecipes);
    const fetchRecepies=Object.values(recepies);
    console.log(fetchRecepies);
    let favoriteItemsList,recipeListItems;
    if(loading){
        favoriteItemsList=null
    }else if(favoriteRecipes.length>0){
        favoriteItemsList=(
            <Fragment>
                {favoriteRecipes.map(recipe=>{
                    return (
                        <Recipe 
                            src={recipe.src}
                            key={recipe.id}
                            title={recipe.title}
                            id={recipe.id}
                            missingIngredient={recipe.missedIngredient}
                        ></Recipe>
                        )
                })}
            </Fragment>
        )
    }
    //dodati loading deo
    if(fetchRecepies.length>0){
        recipeListItems=(
            <Fragment>
                    {fetchRecepies.map((recipe)=>{
                        return (
                        <Recipe 
                            src={recipe.image}
                            key={recipe.id}
                            title={recipe.title}
                            id={recipe.id}
                            missingIngredient={recipe.missedIngredient}
                        ></Recipe>
                        )
                    })}
             </Fragment>
        )
    }
    return (
        <>
            {favoriteItemsList}
            {recipeListItems}
        </>
    )
}

export default RecipeList
