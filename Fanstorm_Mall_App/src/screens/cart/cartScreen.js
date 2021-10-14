
import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import _cartApi from '../../api/cartApi'
import helper from '../../utils/helper'

import CheckBox from '../../baseComponent/checkBox'
import Counter from '../../baseComponent/counter'
import Toast from '../../baseComponent/toast'
import Dialog from '../../baseComponent/dialog';
import Header from '../../baseComponent/header'

const CartScreen = ({ navigation }) => {
    const toast = useRef()
    const dialog = useRef()

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
                let newItems = cartItems.concat([])
                let item = newItems.filter(x => x.id == id)[0];
                item.is_checked = item.is_checked == 1 ? 0 : 1
                setCartItems(newItems)
            },
            (err) => { toast.current.show(err) })
    }

    const updateQuantity = (item, newQuantity) => {
        _cartApi.ChangeCartQuantity(item.product_id, newQuantity,
            (resp) => {
                console.log('change cart success,id =' + item.product_id + ', new quantity = ' + newQuantity)
                if (newQuantity == 0) {
                    let newItems = cartItems.concat([])
                    let index = newItems.findIndex(x => x.id == item.id)
                    newItems.splice(index, 1)
                    setCartItems(newItems)
                }
            },
            (err) => { toast.current.show(err) })
    }

    const renderItem = ({ item }) => {

        const canReduce = (value, can, cant) => {
            if (value > 1) {
                can()
            }
            else {
                dialog.current.confirm('提示', '确定要从购物车删除该物品吗？\n\n' + helper.getStrPre(item.product_name, 25),
                    () => {
                        can()
                    },
                    () => {
                        cant()
                    })
            }
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#ddd', height: 100,
                    marginTop: 10, borderRadius: 10,
                    
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
                                onValueChange={(newValue) => { updateQuantity(item, newValue) }}
                                canReduce={(value, can, cant) => { canReduce(value, can, cant) }}
                            ></Counter>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, }}>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <Header title='购物车'></Header>
            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? <ActivityIndicator /> : (
                    <View>

                        <FlatList
                            data={cartItems}
                            keyExtractor={({ id }, index) => id}
                            renderItem={renderItem}
                        />
                    </View>

                )}
            </View>
        </View>

    );
};

export default CartScreen
