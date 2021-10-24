import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavBottomTab from './navBottomTab'

//home screen

//auth 
import LoginScreen from '../screens/auth/loginScreen'
import RegisterScreen from '../screens/auth/registerScreen'

//product 
import ProductDetailScreen from '../screens/products/productDetailScreen'

//cart 
import CheckOutScreen from '../screens/cart/checkOutScreen'
import CreateOrderSuccessScreen from '../screens/cart/createOrderSuccessScreen'

//mine 
import ReceiveAddressListScreen from '../screens/mine/reveiveAddress/receiveAddressListScreen'
import ReceiveAddressDetailScreen from '../screens/mine/reveiveAddress/receiveAddressDetailScreen'
import RechargeScreen from '../screens/mine/other/rechargeScreen'

//mine order
import OrderListScreen from '../screens/mine/order/orderListScreen'

//Unit Test 
import UnitTestScreen from '../_test/unitTest'

const Stack = createNativeStackNavigator();

const NavStackApp = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'none'
            }}
        >

            {/* home */}
            <Stack.Screen name="HomeTab" component={NavBottomTab} options={{ headerShown: false }} />

            {/* auth */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            {/* product */}
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '商品详情', }} />

            {/* cart */}
            <Stack.Screen name="CheckOut" component={CheckOutScreen} options={{ title: '下单确认', }} />
            <Stack.Screen name="CreateOrderSuccess" component={CreateOrderSuccessScreen} options={{ headerShown: false }} />

            {/* mine */}
            <Stack.Screen name="ReceiveAddressList" component={ReceiveAddressListScreen} options={{ title: '收货地址列表' }} />
            <Stack.Screen name="ReceiveAddressDetail" component={ReceiveAddressDetailScreen} options={{ title: '收货地址详情' }} />
            <Stack.Screen name="Recharge" component={RechargeScreen} options={{ title: '余额充值' }} />

            {/* mine order */}
            <Stack.Screen name="OrderList" component={OrderListScreen} options={{ title: '订单列表' }} />

            <Stack.Screen name="UnitTest" component={UnitTestScreen} options={{ headerShown: false }} />

        </Stack.Navigator >
    )
}

export default NavStackApp

