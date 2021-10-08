import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavStackApp from '../navigation/navStackApp'

const RootScreen = () => {
    return (
        <NavigationContainer>
            <NavStackApp />
        </NavigationContainer>
    );
};

export default RootScreen;
