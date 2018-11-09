
// outsource dependencies
import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import {Button} from 'react-native-elements'

// local dependencies
import Ionicons from 'react-native-vector-icons/Ionicons';
import TasksScreen from '../screens/private/TasksScreen';
import LogInScreen from '../screens/public/LogInScreen';
import BestiaryScreen from '../screens/private/BestiaryScreen';
import {colors} from "../constants/Colors";

const TabNavigator = createBottomTabNavigator(
    {
        Profile: TasksScreen,
        Bestiary: BestiaryScreen,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Profile') {
                    iconName = `ios-bonfire${focused ? '' : '-outline'}`;
                } else if (routeName === 'Bestiary') {
                    iconName = `ios-book${focused ? '' : '-outline'}`;
                }
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        initialRouteName: 'Profile',
        tabBarOptions: {
            activeTintColor: colors.navigationActiveTitle,
            inactiveTintColor: colors.navigationInactiveTitle,
            activeBackgroundColor: colors.navigationActiveTab,
            inactiveBackgroundColor: colors.navigationInactiveTab,
        },
    }
);

export const PrivatePages = createStackNavigator(
    {
        TabNavigator: TabNavigator,
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.headerBackground,
            },
            headerLeft: (
                <Button
                    title='Log out'
                    backgroundColor='transparent'
                    icon={{name: 'sign-out', type: 'font-awesome'}}
                    onPress={() => navigation.navigate('Public')}
                />
            ),
        }),
    },
);

export const LogIn = createStackNavigator(
    {
        LogIn: LogInScreen,
    },
    {
        initialRouteName: 'LogIn',
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.headerBackground,
            },
            headerTitleStyle: {
                color: colors.headerTitleColor,
            },
            title: 'Login'
        }
    }
);
