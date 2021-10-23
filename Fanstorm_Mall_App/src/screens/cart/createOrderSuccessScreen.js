import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Toast from '../../baseComponent/toast'
import Dialog from '../../baseComponent/dialog'
import Header from '../../baseComponent/header'

import fontStyles from '../../utils/fontStyles'
import colors from '../../utils/colors'

const createOrderSuccessScreen = ({ navigation }) => {

    const toast = useRef()
    const dialog = useRef()

    return (
        <View>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <Header title='下单成功'></Header>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                <Image source={require('../../../imgs/resultPage/success.png')}></Image>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProductList') }}
                    style={[styles.btn, styles.btn1]}>
                    <Text style={fontStyles.midBlack}>继续购物</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Mine') }}
                    style={[styles.btn, styles.btn2]}>
                    <Text style={fontStyles.midWhite}>查看订单</Text>
                </TouchableOpacity>
            </View>
        </View >
    )

}

export default createOrderSuccessScreen


const styles = StyleSheet.create({

    btn: {
        borderRadius: 10,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },

    btn1: {
        borderWidth: 1,
        borderColor: '#555',
    },
    btn2: {
        marginLeft: 30,
        backgroundColor: colors.themeBlue,
    },

})