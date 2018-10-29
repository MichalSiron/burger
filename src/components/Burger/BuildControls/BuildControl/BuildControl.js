import React from 'react';
import classes from './BuildControl.css';


const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div>{props.label}</div>
        <button onClick={props.addIngr}>More</button>
        <button onClick={props.removeIngr} disabled={props.disabledInfo}>Less</button>
    </div>
);

export default buildControl;