
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';

import CartItem from './component/cartItem'

import Toast from '../../baseComponent/toast'
import Dialog from '../../baseComponent/dialog';

import helper from '../../utils/helper'
import colors from '../../utils/colors';
import fontStyles from '../../utils/fontStyles';

import _cartApi from '../../api/cartApi'
import _orderApi from '../../api/orderApi'

const CheckOutScreen = (props) => {
    const toast = useRef()
    const dialog = useRef()

    const [note, setNote] = useState('')

    let data = props.route.params;

    const pay = () => {
        _orderApi.Create(data.address.id, note, '123456',
            (res) => {
                toast.current.show('下单成功！')
                console.log('下单成功，res=', res)

                setTimeout(() => {
                    props.navigation.navigate('CreateOrderSuccess')
                }, 500);

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
                justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 10,
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
            <CartItem
                data={item}
                canEditQuantity={false}
            ></CartItem>
        )
    }

    const renderCartItemList = () => {
        return (
            <View style={{ padding: 10, paddingTop: 5 }}>
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
                        <Text style={fontStyles.smGray}>共{productCount}件商品</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Text style={fontStyles.midBlack}>合计：</Text>
                        <Text style={fontStyles.midRed}>￥{data.totalAmount}</Text>
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
            {renderAddress(data.address)}
            {renderCartItemList()}
            <View style={styles.noteView}>
                <Text style={fontStyles.midBlack}>订单备注：</Text>
                <TextInput
                    value={note}
                    onChangeText={(newText) => { setNote(newText) }}
                    style={styles.noteInput}>
                </TextInput>
            </View>
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
        backgroundColor: colors.themeBlue,
    },
    bottomBtnText: {
        color: 'white',
        fontSize: 20,
    },

    noteView: {
        padding: 10,
        flexDirection: 'row'
    },

    noteInput: {
        margin: 0,
        padding: 0,
        borderBottomWidth: 1,
        borderColor: '#555',
        width: 300,
        fontSize: 15,
        textAlignVertical: 'center',
        marginTop: -5
    }
})