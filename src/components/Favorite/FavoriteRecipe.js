import React,{ useContext, useEffect, useState,} from 'react'
import {GlobalContext} from '../Logic/GlobalState';
import hearthFull from '../../images/hearthfull.png';
import hearthEmpty from '../../images/hearthempty.png';
import './FavoriteRecipe.scss';
const FavoriteRecepie = ({id,title,src}) => {
    const [fave,setFave]=useState(false);
    const {favorite,deleteFavorite,addFavorite}=useContext(GlobalContext);
    
    useEffect(()=>{
        if(!favorite.some(favorite=>favorite.id===id)){
            setFave(false);
        }else{
            setFave(true);
        }
    },[favorite,id]);

    const addToFavorites=()=>{
        const newFavorite={
            id,
            title,
            src
        };
        if(!favorite.some(favorite=>favorite.id===id)){
            addFavorite(newFavorite);
        }else{
            deleteFavorite(id);
        }
    } 
    return (
        <>
            <img  onClick={addToFavorites} src={fave?hearthFull:hearthEmpty} className="favorite"></img>
        </>
    )
}

export default FavoriteRecepie
