import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Toast from '../../../baseComponent/toast'
import Dialog from '../../../baseComponent/dialog';

import OrderListTopBtns from './component/orderListTopBtns'
import Order from './component/order'
import NoItem from './component/noItem'

import _orderApi from '../../../api/orderApi'

const orderListScreen = (props) => {
    const toast = useRef()
    const dialog = useRef()
    const [isLoading, setLoading] = useState(true)
    const [orderList, setOrderList] = useState([])
    const [orderStatus, setOrderStatus] = useState(props.route.params.status)

    const getData = () => {
        setLoading(true)
        _orderApi.GetList(orderStatus,
            (resp) => {
                setOrderList(resp.data)
                setLoading(false)
            },
            (err) => { toast.current.show(err) })
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

    useEffect(() => {
        console.log('orderStatus changed, re-getData')
        getData()
    }, [orderStatus])

    return (
        <View style={{ flex: 1 }}>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <OrderListTopBtns
                status={orderStatus}
                onTopBtnPress={(no) => { setOrderStatus(no) }}
            ></OrderListTopBtns>
            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? <ActivityIndicator /> : (
                    orderList.length == 0 ? <NoItem msg={'您没有这样的订单~'}></NoItem> : (
                        <FlatList
                            data={orderList}
                            keyExtractor={({ id }, index) => id}
                            renderItem={({ item }) => <Order item={item}></Order>}
                        />
                    )
                )}
            </View>

        </View>
    )
}


export default orderListScreen