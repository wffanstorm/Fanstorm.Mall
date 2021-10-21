import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//home screen
import HomeScreen from '../screens/home/homeScreen'
import ProductListScreen from '../screens/products/productListScreen'
import CartScreen from '../screens/cart/cartScreen'
import MineScreen from '../screens/mine/mineScreen'

import TabBarItem from '../baseComponent/tabBarItem'


const Tab = createBottomTabNavigator();

const NavBottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                tabBarLabel: "首页",
                tabBarIcon: ({ focused, color, size }) => {
                    return <TabBarItem tintColor={color} focused={-focused}
                        normalImage={require('../../imgs/bottomtab/bottomTabHome1.png')}
                        focusedImage={require('../../imgs/bottomtab/bottomTabHome2.png')} />
                }
            }} />
            <Tab.Screen name="ProductList" component={ProductListScreen} options={{
                headerShown: false,
                tabBarLabel: "商品列表",
                tabBarIcon: ({ focused, color, size }) => {
                    return <TabBarItem tintColor={color} focused={-focused}
                        normalImage={require('../../imgs/bottomtab/bottomTabKinds1.png')}
                        focusedImage={require('../../imgs/bottomtab/bottomTabKinds2.png')} />
                }
            }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{

                headerShown: false,
                tabBarLabel: "购物车",
                tabBarIcon: ({ focused, color, size }) => {
                    return <TabBarItem tintColor={color} focused={-focused}
                        normalImage={require('../../imgs/bottomtab/bottomTabCart1.png')}
                        focusedImage={require('../../imgs/bottomtab/bottomTabCart2.png')} />
                }

            }} />
            <Tab.Screen name="Mine" component={MineScreen} options={{
                headerShown: false,
                tabBarLabel: "我的",
                tabBarIcon: ({ focused, color, size }) => {
                    return <TabBarItem tintColor={color} focused={-focused}
                        normalImage={require('../../imgs/bottomtab/bottomTabMine1.png')}
                        focusedImage={require('../../imgs/bottomtab/bottomTabMine2.png')} />
                }
            }} />
        </Tab.Navigator>
    );
}

export default NavBottomTab