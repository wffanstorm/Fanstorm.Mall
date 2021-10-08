
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import _cartApi from '../../api/cartApi'
import helper from '../../utils/helper'

import CheckBox from '../../baseComponent/checkBox'
import Counter from '../../baseComponent/counter'

const CartScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const getData = () => {
        _cartApi.GetList(
            (resp) => {
                console.log(resp.data)
                setCartItems(resp.data)
                setLoading(false)
            },
            () => { })
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log('CartScreen focus')
            getData()

            return () => {
                console.log('CartScreen unfocus')
            };
        }, [])
    );

    const check = (id) => {
        console.log('check,id = ', id)
        _cartApi.Check(id,
            (resp) => {
                getData()
            },
            (err) => { alert(err) })
    }

    const updateQuantity = (productId, newQuantity) => {
        console.log('updateQuantity')
        console.log('productId=', productId)
        console.log('newQuantity=', newQuantity)

        _cartApi.ChangeCartQuantity(productId, newQuantity,
            (resp) => {
                console.log('ChangeCartQuantity done. resp = ', resp)
            },
            (err) => { alert(err) })
    }

    const renderItem = ({ item }) => {
        let c = item.is_checked ? 'green' : 'gray'
        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#ddd', height: 100,
                    marginTop: 10, borderRadius: 10
                }}>
                <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox value={item.is_checked} onPress={() => { check(item.id) }}></CheckBox>
                </View>

                <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item.product_pic }} style={{ width: 90, height: 90, borderRadius: 10 }}></Image>
                </View>

                <View style={{ width: 240, height: 100, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 15 }}>{helper.getStrPre(item.product_name, 30)}</Text>
                    <Text style={{ fontSize: 13, color: 'gray', marginTop: 5 }}>{helper.getStrPre(item.product_desc, 30)}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>￥{item.price}</Text>
                        <View>
                            <Counter value={item.quantity.toString()}
                                onValueChange={(newValue) => { updateQuantity(item.product_id, newValue) }}
                            ></Counter>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={cartItems}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default CartScreen
