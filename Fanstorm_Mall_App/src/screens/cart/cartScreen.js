import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import CartItem from './component/cartItem'

import Toast from '../../baseComponent/toast'
import Dialog from '../../baseComponent/dialog';
import Header from '../../baseComponent/header'
import CheckBox from '../../baseComponent/checkBox'
import Counter from '../../baseComponent/counter'

import helper from '../../utils/helper'
import colors from '../../utils/colors';

import _cartApi from '../../api/cartApi'

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

    const checkOut = () => {
        _cartApi.Checkout(
            (res) => {
                navigation.navigate('CheckOut', res.data)
            },
            (err) => { toast.current.show(err) }
        )
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
            <CartItem
                data={item}
                check={(id) => { check(id) }}
                updateQuantity={(newValue) => { updateQuantity(item, newValue) }}
                canReduce={(value, can, cant) => { canReduce(value, can, cant) }}
                canEditQuantity={true}
            ></CartItem>
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
            <View style={styles.bottomView}>
                <TouchableOpacity
                    style={styles.bottomBtn}
                    onPress={() => { checkOut() }}>
                    <Text style={styles.bottomBtnText}>结算</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default CartScreen


const styles = StyleSheet.create({
    bottomView: {
        width: '100%',
        height: 70,
        backgroundColor: colors.themeBlue,
    },
    bottomBtn: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBtnText: {
        color: 'white',
        fontSize: 20,
    }

})