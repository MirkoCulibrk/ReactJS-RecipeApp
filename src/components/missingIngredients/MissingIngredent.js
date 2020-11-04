import React,{useContext} from 'react'
import {GlobalContext} from '../Logic/GlobalState';
const MissingIngredent = ({ingredient}) => {
    const {addIngredient,ingredients}=useContext(GlobalContext);

    const addMissingIngredient=(ingredient)=>{
        const newIngredient={
            id:Math.floor(Math.random()*10000),
            value:ingredient
        };
        addIngredient(newIngredient);
    }
    const ingredientAdded=ingredients.filter(newIngredient=>{
        return ingredient===newIngredient.value;
    });
    return (
        <>
            {!ingredientAdded.length?(
                <div className="missingIngredient" onClick={()=>addMissingIngredient(ingredient)}>
                    {ingredient}
                    <div className="add-ingredient">
                        <span >+</span>
                    </div>
                </div>
            ):null}
        </>
    )
}

export default MissingIngredent
