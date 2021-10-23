
import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Toast from '../../baseComponent/toast'
import Dialog from '../../baseComponent/dialog'
import RectButton from '../../baseComponent/button/rectButton'

import _userApi from '../../api/userApi'


const MineScreen = (props) => {

    const toast = useRef()
    const dialog = useRef()

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isShownLoginButton, setIsShownLoginButton] = useState(false)
    const [money, setMoney] = useState(0)
    const [nickname, setNickname] = useState('nickname')
    const [username, setUsername] = useState('username')
    const [phone, setPhone] = useState('phone')
    const [avatar, setAvatar] = useState(require('../../../imgs/mine/mineFans.png'))


    const getData = () => {
        _userApi.GetInfo(
            (resp) => {
                global.currentUser.userInfo = resp.data
                global.storage.save('currentUser', global.currentUser)

                let d = resp.data
                setMoney(d.money)
                setNickname(d.nickname)
                setUsername(d.username)
                setPhone(d.phone)
                setAvatar({ uri: d.avatar })
            },
            (err) => { console.log(err) }
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log('MineScreen focus')
            getData()

            return () => {
                console.log('MineScreen unfocus')
            };
        }, [])
    );

    const onScrollRefresh = () => {
        setIsRefreshing(true)
        getData()
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000);
    }

    const goReceiveAddressList = () => {
        props.navigation.navigate("ReceiveAddressList")
    }

    const goRecharge = () => {
        props.navigation.navigate("Recharge")
    }

    const goOrderList = (status) => {
        props.navigation.navigate("OrderList", { status })
    }

    const renderIconButton = (title, onPress, source) => {
        return (
            <TouchableOpacity style={styles.iconView} onPress={() => { onPress() }}>
                <Image source={source}
                    style={styles.iconStyle}>
                </Image>
                <Text>{title}</Text>
            </TouchableOpacity>
        )
    }

    const loginView = isShownLoginButton ?
        <RectButton title="login" onPress={() => { props.navigation.navigate("Login") }}></RectButton> :
        <View></View>

    return (
        <View>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => { onScrollRefresh() }}
                        tintColor='gray'
                    ></RefreshControl>
                }
            >
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
                    <View style={{ width: 100 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={avatar}></Image>
                    </View>
                    <View style={{ flexDirection: 'column', width: 200, justifyContent: 'center', paddingLeft: 20 }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>{nickname}</Text>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View>
                            <Text style={{ fontSize: 13, color: '#ccc' }}>{username}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', paddingTop: 20 }}>
                        <Text>当前余额：</Text>
                        <Text>￥{money}</Text>
                    </View>
                </View>

                <View style={{ height: 50 }}></View>

                <View style={{ backgroundColor: '#eee', borderRadius: 20, margin: 10, padding: 10 }}>
                    <View>
                        <Text style={{ fontSize: 16, color: '#333' }}>我的订单</Text>
                    </View>
                    <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        {renderIconButton("全部", () => { goOrderList(null) }, require('../../../imgs/mine/mineOrderPendingPay.png'))}
                        {renderIconButton("待发货", () => { goOrderList(0) }, require('../../../imgs/mine/mineOrderPendingSendProduct.png'))}
                        {renderIconButton("待签收", () => { goOrderList(1) }, require('../../../imgs/mine/mineOrderPendingRcv.png'))}
                        {renderIconButton("已完成", () => { goOrderList(2) }, require('../../../imgs/mine/mineOrderDone.png'))}
                    </View>
                </View>

                <View style={{ backgroundColor: '#eee', borderRadius: 20, margin: 10, padding: 10 }}>
                    <View>
                        <Text style={{ fontSize: 16, color: '#333' }}>其他</Text>
                    </View>
                    <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        {renderIconButton("收货地址", () => { goReceiveAddressList() }, require('../../../imgs/mine/mineServAddressMenu.png'))}
                        {renderIconButton("余额充值", () => { goRecharge() }, require('../../../imgs/mine/minePhoneRecharge.png'))}
                        {renderIconButton("油卡充值", () => { }, require('../../../imgs/mine/mineOilRecharge.png'))}
                        {renderIconButton("服务中心", () => { }, require('../../../imgs/mine/mineServCenter.png'))}
                    </View>
                </View>

                {loginView}

            </ScrollView>

        </View>
    )

}

export default MineScreen


const styles = StyleSheet.create({
    iconStyle: {
        width: 30,
        height: 30
    },
    iconView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70
    },
    rechargeBtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#555',
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
        width: 40
    },
})