import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavBottomTab from './navBottomTab'

//home screen

//auth screen
import LoginScreen from '../screens/auth/loginScreen'
import RegisterScreen from '../screens/auth/registerScreen'

// product screen
import ProductDetailScreen from '../screens/products/productDetailScreen'

// cart screen
import CheckOutScreen from '../screens/cart/checkOutScreen'
import CreateOrderSuccessScreen from '../screens/cart/createOrderSuccessScreen'

//mine screen
import ReceiveAddressListScreen from '../screens/mine/reveiveAddress/receiveAddressList'
import ReceiveAddressDetailScreen from '../screens/mine/reveiveAddress/receiveAddressDetail'
import RechargeScreen from '../screens/mine/other/recharge'

// Unit Test 
import UnitTestScreen from '../_test/unitTest'

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

            {/* auth screen */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            {/* product screen */}
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '商品详情', }} />

            {/* cart screen */}
            <Stack.Screen name="CheckOut" component={CheckOutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateOrderSuccess" component={CreateOrderSuccessScreen} options={{ headerShown: false }} />

            {/* mine screen */}
            <Stack.Screen name="ReceiveAddressList" component={ReceiveAddressListScreen} options={{ title: '收货地址列表' }} />
            <Stack.Screen name="ReceiveAddressDetail" component={ReceiveAddressDetailScreen} options={{ title: '收货地址详情' }} />
            <Stack.Screen name="Recharge" component={RechargeScreen} options={{ title: '余额充值' }} />




            <Stack.Screen name="UnitTest" component={UnitTestScreen} options={{ headerShown: false }} />


        </Stack.Navigator >
    )
}

export default NavStackApp

