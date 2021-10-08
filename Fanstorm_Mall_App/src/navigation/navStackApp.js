import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavBottomTab from './navBottomTab'

//home screen
import ProfileScreen from '../screens/home/profileScreen'

//auth screen
import LoginScreen from '../screens/auth/loginScreen'
import RegisterScreen from '../screens/auth/registerScreen'


//mine screen
import ReceiveAddressListScreen from '../screens/mine/reveiveAddress/receiveAddressList'
import ReceiveAddressDetailScreen from '../screens/mine/reveiveAddress/receiveAddressDetail'

// product screen
import ProductDetailScreen from '../screens/products/productDetailScreen'


const Stack = createNativeStackNavigator();

const NavStackApp = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'none'
            }}
        >

            {/* home screen */}
            <Stack.Screen name="HomeTab" component={NavBottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

            {/* auth screen */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            {/* mine screen */}
            <Stack.Screen name="ReceiveAddressList" component={ReceiveAddressListScreen} options={{ title: '收货地址列表' }} />
            <Stack.Screen name="ReceiveAddressDetail" component={ReceiveAddressDetailScreen} options={{ title: '收货地址详情' }} />

            {/* product screen */}
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '商品详情', }} />

        </Stack.Navigator >
    )
}

export default NavStackApp

