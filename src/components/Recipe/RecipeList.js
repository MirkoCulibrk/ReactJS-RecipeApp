import React, { Fragment } from 'react'
import Recipe from './Recipecard/Recipe';
import './RecipeList.scss';
const RecipeList = ({recepies,loading,favoriteRecipes}) => {
    const fetchRecepies=Object.values(recepies);
    let favoriteItemsList,recipeListItems;
    if(loading){
        favoriteItemsList=null;
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
                            missingFoodIngredients={recipe.missedIngredients}
                        ></Recipe>
                        )
                })}
            </Fragment>
        )
    }

    //dodati loading deo
    if(loading || fetchRecepies===null){
        let placeHolder=[];
        for (let i=9;i<9;i++){
            placeHolder.push(<div className="col-lg-4"><div className="recipeCard" key={i}></div></div>)
        }
       recipeListItems=<Fragment>{placeHolder}</Fragment>
       return <p className="text-center">Loading...</p>
    }else if(fetchRecepies.length>0){
        recipeListItems=(
            <Fragment>
                    {fetchRecepies.map((recipe)=>{
                        return (
                        <Recipe 
                            src={recipe.image}
                            key={recipe.id}
                            title={recipe.title}
                            id={recipe.id}
                            missingFoodIngredients={recipe.missedIngredients}
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
