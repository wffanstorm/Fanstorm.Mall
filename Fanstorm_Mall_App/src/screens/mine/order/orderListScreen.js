import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, FlatList, View, } from 'react-native';

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
    const [pageIndex, setPageIndex] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    let pageSize = 10

    const _getData = () => {
        if (orderList.length == 0) {
            setLoading(true)
        }
        _orderApi.GetList(orderStatus, pageIndex, pageSize,
            (resp) => {
                if (resp.data.length < pageSize) {
                    setHasNextPage(false)
                }
                else {
                    setHasNextPage(true)
                }
                if (pageIndex == 1) {
                    setOrderList(resp.data)
                }
                else {
                    setOrderList(orderList.concat(resp.data))
                }
                setLoading(false)
            },
            (err) => { toast.current.show(err) })
    }

    const getData = (function () {
        let timer = null
        return function () {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                _getData()
            }, 100);
        }
    }())

    const onEndReached = () => {
        if (!hasNextPage) {
            return
        }
        setPageIndex(pageIndex + 1)
    }

    const onTopBtnPress = (no) => {
        setOrderStatus(no)
    }

    useEffect(() => {
        getData()
    }, [pageIndex])

    useEffect(() => {
        if (pageIndex == 1) {
            getData()
        }
        else {
            setPageIndex(1)
        }
    }, [orderStatus])


    return (
        <View style={{ flex: 1 }}>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <OrderListTopBtns
                status={orderStatus}
                onTopBtnPress={(no) => { onTopBtnPress(no) }}
            ></OrderListTopBtns>
            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? <ActivityIndicator /> : (
                    orderList.length == 0 ? <NoItem msg={'您没有这样的订单~'}></NoItem> : (
                        <FlatList
                            data={orderList}
                            keyExtractor={({ id }, index) => id}
                            renderItem={({ item }) => <Order item={item}></Order>}
                            onEndReached={() => { onEndReached() }}
                            onEndReachedThreshold={0.9}
                        />
                    )
                )}
            </View>

        </View>
    )
}


export default orderListScreen