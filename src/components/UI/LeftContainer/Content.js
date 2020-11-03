import React from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Addingredent from '../../AddIngredent/AddIngredent';
import IngredentList from '../../IngredentsList/IngredentList';
import RecipeList from '../../Recipe/RecipeList';
import './Content.scss';

const Content = ({api_call,loading,recepies,favoriteRecipes}) => {
    console.log(api_call);
        return (
        <>
            <Col lg="5" className="background"> 
                    <div className="logo-container">
                        <img src="/images/logo.png" alt="logo"></img>
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
                    <Button variant="primary" onClick={api_call} disabled={loading} className="btn-fetch">{loading?'Finding Recepes':'Find Recipes'}</Button>
                </div>
                <Col lg="12">
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

