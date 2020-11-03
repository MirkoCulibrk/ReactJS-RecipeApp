import React, { useContext } from 'react'
import {GlobalContext} from '../Logic/GlobalState';
import './Ingredent.scss';
const Ingredient = (props) => {
    const {deleteIngredient}=useContext(GlobalContext);
    return (
        <li className="ingredent" onClick={()=>deleteIngredient(props.ingredient.id)}>
            {props.ingredient.value}
            <span className="icon">x</span>
        </li>
    )
}

export default Ingredient
