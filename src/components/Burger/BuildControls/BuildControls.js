import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.totalCost.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                addIngr={() => props.addIngredient(ctrl.type)}
                removeIngr={() => props.removeIngredient(ctrl.type)}
                disabledInfo={props.disableButton[ctrl.type]}
            />
        ))}
        <button disabled={!props.purchasable}>ORDER NOW!</button>
    </div>
);

export default buildControls;