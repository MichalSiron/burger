import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const PRICE_LIST = {
    salad: 3,
    bacon: 11,
    cheese: 7,
    meat:18
};


class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalCost: 3,
        purchasable: false
    };

    updatePurchasableState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, element) => {
                return sum + element;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldCount +1;

        const oldPrice = this.state.totalCost;
        const additionalPrice = PRICE_LIST[type];
        const newPrice = oldPrice + additionalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalCost: newPrice
        });
        this.updatePurchasableState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        if (oldCount <= 0){
            return;
        }
        updatedIngredients[type] = oldCount -1;

        const oldPrice = this.state.totalCost;
        const additionalPrice = PRICE_LIST[type];
        const newPrice = oldPrice - additionalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalCost: newPrice
        });
        this.updatePurchasableState(updatedIngredients);
    };

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        console.log(disabledInfo);

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disableButton={disabledInfo}
                    totalCost={this.state.totalCost}
                    purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;