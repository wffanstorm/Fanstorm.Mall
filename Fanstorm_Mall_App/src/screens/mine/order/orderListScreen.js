import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Toast from '../../../baseComponent/toast'
import Dialog from '../../../baseComponent/dialog';

import _orderApi from '../../../api/orderApi'

const orderListScreen = (props) => {
    const toast = useRef()
    const dialog = useRef()
    const [isLoading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);

    const getData = () => {
        _orderApi.GetList(null,
            (resp) => {
                console.log(resp)
            },
            () => { })
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log('OrderList Screen focus')
            getData()

            return () => {
                console.log('OrderList Screen unfocus')
            };
        }, [])
    );

    const renderOrder = ({ order }) => {
        return (
            <View>

            </View>
        )
    }

    const renderOrderItem = (item) => {
        return (
            <View>

            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={orderList}
                        keyExtractor={({ id }, index) => id}
                        renderItem={renderOrder}
                    />
                )}
            </View>

        </View>
    )
}


export default orderListScreen