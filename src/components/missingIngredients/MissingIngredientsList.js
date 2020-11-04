import React from 'react'
import MissingIngredient from './MissingIngredent';
const MissingIngredientsList = ({missingIngredients}) => {
    return (
        <>
            {missingIngredients.map(ingredient=>{
                return <MissingIngredient key={ingredient.id} ingredient={ingredient.name}></MissingIngredient>
            })}
            
        </>
    )
}

export default MissingIngredientsList
