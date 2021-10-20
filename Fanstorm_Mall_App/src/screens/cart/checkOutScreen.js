
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import _cartApi from '../../api/cartApi'
import _orderApi from '../../api/orderApi'

import helper from '../../utils/helper'
import font from '../../utils/fontStyles'

import CheckBox from '../../baseComponent/checkBox'
import Counter from '../../baseComponent/counter'
import Toast from '../../baseComponent/toast'
import Dialog from '../../baseComponent/dialog';
import Header from '../../baseComponent/header'
import color from '../../utils/color';

const CheckOutScreen = (props) => {
    const toast = useRef()
    const dialog = useRef()

    let data = props.route.params;

    useEffect(() => {

        return () => {

        }
    }, [])

    const pay = () => {
        _orderApi.Create(data.address.id, 'hello', '123456',
            (res) => {
                toast.current.show('下单成功！')
                console.log('下单成功，res=', res)
            },
            (err) => {
                toast.current.show('下单失败！')
                console.log('下单失败！err=', err)
            }
        )
    }

    let productCount = 0
    data.cartItems.forEach(element => {
        productCount += element.quantity
    });

    const renderAddress = (address) => {
        return (
            <View style={{
                flexDirection: 'row', padding: 10, margin: 5, marginTop: 10,
                justifyContent: 'space-between', backgroundColor: '#ddd', borderRadius: 20,
            }}>

                <View style={{ flexDirection: 'column', marginLeft: 10, width: 250 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{address.name}</Text>
                        <Text style={{ marginLeft: 20 }}>{address.phone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, width: '100%', }}>
                        <Text style={{ flexWrap: 'wrap', flex: 1 }}>
                            {address.province} {address.city} {address.region} {address.detail_address}</Text>
                    </View>
                </View>
            </View>

        )
    }

    const renderCartItem = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#ddd', height: 100,
                    marginTop: 10, borderRadius: 10,

                }}>
                <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item.product_pic }} style={{ width: 90, height: 90, borderRadius: 10 }}></Image>
                </View>
                <View style={{ width: 240, height: 100, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 15 }}>{helper.getStrPre(item.product_name, 30)}</Text>
                    <Text style={{ fontSize: 13, color: 'gray', marginTop: 5 }}>{helper.getStrPre(item.product_desc, 30)}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>￥{item.price}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderCartItemList = () => {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <FlatList
                    data={data.cartItems}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderCartItem}
                />
            </View>
        )
    }

    const renderBottomView = () => {
        return (
            <View style={styles.bottomView}>
                <View style={styles.bottomLeftView}>
                    <View>
                        <Text style={font.smGray}>共{productCount}件商品</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Text style={font.midBlack}>合计：</Text>
                        <Text style={font.midRed}>￥{data.totalAmount}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.bottomBtn}
                    onPress={() => { pay() }}>
                    <Text style={styles.bottomBtnText}>确认支付订单</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <Header title='下单确认' goBack={() => { props.navigation.goBack() }}></Header>
            {renderAddress(data.address)}
            {renderCartItemList()}
            {renderBottomView()}
        </View>
    )
}

export default CheckOutScreen

const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row'
    },
    bottomLeftView: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 30,
    },
    bottomBtn: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.themeBlue,
    },
    bottomBtnText: {
        color: 'white',
        fontSize: 20,
    }
})