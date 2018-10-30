import React from 'react';
import BuildControl from './BuildControl/BuildCntl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl
                label={control.label}
                key={control.label}
                added={() => props.addIngredient(control.type)}
                removed={() => props.removeIngredient(control.type)}
                disabledBtn={props.disabled[control.type]}/>
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchasing}>PURCHASE NOW!</button>
    </div>
);

export default buildControls;