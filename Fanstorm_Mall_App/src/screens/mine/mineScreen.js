
import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Image,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import RectButton from '../../baseComponent/button/rectButton'
import IconButton from '../../baseComponent/button/iconButton'

import userApi from '../../api/userApi'
import helper from '../../utils/helper'

export default class HeaderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            isShownLoginButton: false,
            money: 0,
            nickname: 'nickname',
            username: 'username',
            phone: 'phone',
            avatar: require('../../../imgs/mine/mineFans.png')
        }
    }

    componentWillUnmount() {
        // if (this._navListener) {
        //     this._navListener.remove();
        // }
    }


    componentDidMount() {
        if (helper.isIOS) {
        }
        this.refresh();
        // setTimeout(() => {
        //     this._navListener = this.props.navigation.addListener('didFocus', () => {
        //         this.refresh();
        //     });
        // }, 1000);
    }

    refresh() {
        userApi.GetInfo(
            (resp) => {
                global.currentUser.userInfo = resp.data
                this.setState({
                    money: resp.data.money,
                    nickname: resp.data.nickname,
                    username: resp.data.username,
                    phone: resp.data.phone,
                    avatar: { uri: resp.data.avatar },
                })
                // global.storage.save('user', global.currentUser)
                // this.setState({
                //     isMerchant: resp.data.isMerchant,
                //     order: resp.data.order || this.state.order,
                // })
                // this.refs.headerView.refresh()
            },
            (ex) => { alert('getinfo :' + ex) }
        )

    }
    onScrollRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.refresh()
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
            })
        }, 1000);
    }

    goReceiveAddressList() {
        this.props.navigation.navigate("ReceiveAddressList")
    }

    renderIconButton(title, onPress, source) {
        return (
            <TouchableOpacity style={styles.iconView} onPress={() => { onPress() }}>
                <Image source={source}
                    style={styles.iconStyle}>
                </Image>
                <Text>{title}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        let loginView = this.state.isShownLoginButton ?
            <RectButton title="login" onPress={() => { this.props.navigation.navigate("Login") }}></RectButton> :
            <View></View>

        return (
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => { this.onScrollRefresh() }}
                            tintColor='gray'
                        ></RefreshControl>
                    }
                >
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
                        <View style={{ width: 100 }}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={this.state.avatar}></Image>
                        </View>
                        <View style={{ flexDirection: 'column', width: 200, justifyContent: 'center', paddingLeft: 20 }}>
                            <View>
                                <Text style={{ fontSize: 15 }}>{this.state.nickname}</Text>
                            </View>
                            <View style={{ height: 10 }}></View>
                            <View>
                                <Text style={{ fontSize: 13, color: '#ccc' }}>{this.state.username}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Text>当前余额：</Text>
                            <Text>{this.state.money}</Text>
                        </View>
                    </View>

                    <View style={{ height: 50 }}></View>

                    <View style={{ backgroundColor: '#eee', borderRadius: 20, margin: 10, padding: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, color: '#333' }}>我的订单</Text>
                        </View>
                        <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            {this.renderIconButton("待支付", () => { }, require('../../../imgs/mine/mineOrderPendingPay.png'))}
                            {this.renderIconButton("待发货", () => { }, require('../../../imgs/mine/mineOrderPendingSendProduct.png'))}
                            {this.renderIconButton("待签收", () => { }, require('../../../imgs/mine/mineOrderPendingRcv.png'))}
                            {this.renderIconButton("已完成", () => { }, require('../../../imgs/mine/mineOrderDone.png'))}
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#eee', borderRadius: 20, margin: 10, padding: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, color: '#333' }}>其他</Text>
                        </View>
                        <View style={{ backgroundColor: '#ddd', height: 1 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            {this.renderIconButton("收货地址", () => { this.goReceiveAddressList() }, require('../../../imgs/mine/mineServAddressMenu.png'))}
                            {this.renderIconButton("手机充值", () => { }, require('../../../imgs/mine/minePhoneRecharge.png'))}
                            {this.renderIconButton("油卡充值", () => { }, require('../../../imgs/mine/mineOilRecharge.png'))}
                            {this.renderIconButton("服务中心", () => { }, require('../../../imgs/mine/mineServCenter.png'))}
                        </View>
                    </View>

                    {loginView}


                </ScrollView>

            </View>

        );
    }
}


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
    }
})