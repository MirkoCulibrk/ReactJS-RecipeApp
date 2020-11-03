import React, { useContext, useState } from 'react'
import './Recipe.scss';
import {Col} from 'react-bootstrap';
import { GlobalContext } from '../../Logic/GlobalState';
import Hearth from '../../Favorite/FavoriteRecipe';
import Popup from 'reactjs-popup';
import axios from 'axios';
const Recipe = ({src,id,title,missingIngredient}) => {
    const {ingredients}=useContext(GlobalContext);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [open,setOpen]=useState(false);
    const [recipe,setRecipe]=useState({})

    const openPopUp= async() =>{
        setLoading(true);
        setOpen(true);
        try{
            const results=await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=51eb63a4bcd24e4799b87c09af08d3dc`);
            setLoading(false);
            setRecipe(results.data);

        }
        catch(error){
            setError(true);
            setLoading(false);
        }
    }
    return (
        <>
            <Col lg="4">
                <div className="recipeCard">
                    <Hearth src={src} id={id} title={title}></Hearth>
                    <div className="img-container">
                        <img src={src} alt="ff"></img>
                        <p className="text-center">{missingIngredient}</p>
                        <div className="popup" onClick={openPopUp}> </div>
                    </div>
                    <div className="title-container">
                        <h5 className="text-center">{title}</h5>
                    </div>
                </div>
            </Col>
            <Popup open={open} closeOnDocumentClick  onClose={()=>setOpen(false)}>
                <h5>{title}</h5>
                <button onClick={()=>setOpen(false)}>close</button>
            </Popup>
        </>
    )
}

export default Recipe
