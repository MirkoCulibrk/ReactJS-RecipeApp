import React, {useContext}from 'react'
import {GlobalContext} from '../Logic/GlobalState';
import Ingredient from './Ingredent';
import './IngredentList.scss';
const IngredentList = () => {
    const {ingredients}=useContext(GlobalContext);
    return (
        <div className="list-container">
            <ul className="ingredent-list">
            {ingredients.map((ingredient)=>(
                     <Ingredient key={ingredient.id} ingredient={ingredient}></Ingredient>
                ))}
            </ul>
        </div>
    )
}

export default IngredentList
