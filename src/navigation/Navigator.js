
// outsource dependencies
import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

// local dependencies
import { LogIn, PrivatePages } from "./NavigatorConfigurations";

const AppNavigator = createSwitchNavigator(
    {
        Public: LogIn,
        Private: PrivatePages,
    },
    {
        initialRouteName: 'Public',
    }
);

export const navReducer = createNavigationReducer(AppNavigator);

export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);


const nav = reduxifyNavigator( AppNavigator, "root" );
export default connect( (state) => ({ state: state.nav }) )(nav);