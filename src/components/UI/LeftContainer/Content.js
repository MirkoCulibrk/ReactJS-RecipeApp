import React from 'react'
import Col from 'react-bootstrap/Col';
import Addingredent from '../../AddIngredent/AddIngredent';
import IngredentList from '../../IngredentsList/IngredentList';
import RecipeList from '../../Recipe/RecipeList';
import './Content.scss';
import logo from '../../../images/logo.png';
const Content = ({api_call,loading,recepies,favoriteRecipes,message}) => {
        return (
        <>
            <Col lg="5" className="background"> 
                    <div className="logo-container">
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className="text-container">
                        <h4>Discover what you can make with what you got in your fridge or pantry</h4>
                    </div>
                    <Addingredent></Addingredent>
                    <IngredentList></IngredentList>
            </Col>
            <Col lg="7">
                <div className="info-container">
                    <h2>Recipes</h2>
                    <div className="btn-container">
                        <a onClick={api_call} disabled={loading} className="btn-fetch">{loading?'Finding Recepes':'Find Recipes'}</a>
                    </div>
                </div>
                <Col lg="12">
                    <p className="text">{message}</p>
                    <RecipeList
                        recepies={recepies}
                        loading={loading}
                        favoriteRecipes={favoriteRecipes}
                    ></RecipeList>
                </Col>
            </Col>
        </>
    )
}

export default Content

