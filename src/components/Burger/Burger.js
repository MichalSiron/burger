import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingrediendUpdater = Object.keys(props.ingredients).map(
        igType => {
            return [...Array(props.ingredients[igType])].map((_, i) => (
                <BurgerIngredient type={igType} key={igType+i}/>
            ))}).reduce((arr, element) => (
                arr.concat(element)), []);

    console.log(ingrediendUpdater.length);
    if (ingrediendUpdater.length === 0){
        ingrediendUpdater = <p>Please add ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingrediendUpdater}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;