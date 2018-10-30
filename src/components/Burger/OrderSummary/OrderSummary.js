import React from 'react';
import Aux from '../../../hoc/Aux';


const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map( igKey => {
            return (<li key={igKey}>{igKey}: {props.ingredients[igKey]}</li>)
        });


    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue with checkout?</p>
        </Aux>
    );
};


export default orderSummary;