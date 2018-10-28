import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Aux from '../../hoc/Aux';

const INGREDIENT_PRICES = {
    salad: 17,
    meat: 54,
    bacon: 24,
    cheese: 19
};


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            salad: 0,
            meat: 0
        },
        totalPrice: 0
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const updatedPrice = oldTotalPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    };

    render(){
        console.log(this.state.ingredients);
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.addIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;