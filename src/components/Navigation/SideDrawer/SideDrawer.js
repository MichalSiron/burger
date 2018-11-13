import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let sidemenu = [classes.SideDrawer, classes.Close];
    if (props.open){
        sidemenu = [classes.SideDrawer, classes.Open];
    }

    return(
        <>
            <Backdrop show={props.open} clicked={props.closeHandler}/>
            <div className={sidemenu.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;