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
        {controls.map(control => (
            <BuildControl
                label={control.label}
                key={control.label}
                added={() => props.addIngredient(control.type)}/>
        ))}
    </div>
);

export default buildControls;