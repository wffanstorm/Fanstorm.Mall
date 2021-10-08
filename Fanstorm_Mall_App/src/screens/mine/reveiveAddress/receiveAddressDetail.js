import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TextInput
} from 'react-native';

import _userReceiveAddressApi from '../../../api/userReceiveAddressApi'


import Picker from 'react-native-picker';
import RectButton from '../../../baseComponent/button/rectButton';
import cityJson from '../../../json/city.json'


const getCitysWheelData = () => {
    return cityJson.provinces.map(p => {
        return ({
            [p.name]: p.childs.map(c =>
            ({
                [c.name]: c.childs.map(a =>
                    a.name)
            }))
        })
    })
}


const ReceiveAddressDetailScreen = (props) => {

    let pickerData = getCitysWheelData();

    let id = ""
    let address = {}
    if (props.route.params) {
        address = props.route.params.item
        id = address.id
    }

    const [name, setName] = useState(id ? address.name : '')
    const [phone, setPhone] = useState(id ? address.phone : '')
    const [detailAddress, setDetailAddress] = useState(id ? address.detail_address : '')
    const [shengShiQu, setShengShiQu] = useState({
        province: id ? address.province : '',
        city: id ? address.city : '',
        region: id ? address.region : '',
        str: id ? (address.province + ' ' + address.city + ' ' + address.region) : ''
    })

    Picker.init({
        pickerTitleText: '请选择',
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerData: pickerData,
        selectedValue: [shengShiQu.province, shengShiQu.city, shengShiQu.region],
        onPickerConfirm: data => {
            console.log("picker confirm", data)
            setShengShiQu({
                province: data[0],
                city: data[1],
                region: data[2],
                str: data[0] + ' ' + data[1] + ' ' + data[2]
            })
        },
    });

    const submit = () => {

        if (name && phone && detailAddress) { }
        else {
            alert('请输入完整信息')
            return
        }

        _userReceiveAddressApi.AddOrUpdate(
            id, name, phone,
            shengShiQu.province, shengShiQu.city, shengShiQu.region, detailAddress,
            (resp) => {
                if (id) {
                    alert('修改地址成功！')
                }
                else {
                    alert('添加地址成功！')
                }
                props.navigation.navigate("ReceiveAddressList", {
                    needRefresh: true,
                    time: Date.now()
                })

            },
            (err) => { alert(err) })
    }

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.text}>用户名</Text>
                <TextInput
                    placeholder="请输入用户名"
                    style={styles.textInput}
                    value={name}
                    onChangeText={(newText) => { setName(newText) }}
                ></TextInput>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>手机号</Text>
                <TextInput
                    placeholder="请输入手机号"
                    style={styles.textInput}
                    value={phone}
                    onChangeText={(newText) => { setPhone(newText) }}
                ></TextInput>
            </View>
            <View style={[styles.row, { height: 50, padding: 10 }]}>
                <Text style={styles.text}>省市区</Text>
                <View style={{ flexDirection: 'column', height: 50 }}>
                    <Text
                        style={[styles.textInput, { height: 48, textAlignVertical: 'center' }]}
                        onPress={() => { Picker.show() }}
                    >
                        {shengShiQu.str}
                    </Text>
                    <View style={{ backgroundColor: '#eee', width: 280, height: 1, marginLeft: 30, }}></View>
                </View>


            </View>
            <View style={styles.row}>
                <Text style={styles.text}>详细地址</Text>
                <TextInput
                    placeholder="请输入详细地址"
                    style={[styles.textInput, { marginLeft: 15 }]}
                    value={detailAddress}
                    onChangeText={(newText) => { setDetailAddress(newText) }}
                ></TextInput>
            </View>

            <View style={{ height: 20 }}></View>

            <RectButton title={id ? "Edit" : "Add"} onPress={() => { submit() }}></RectButton>

        </View >
    );
};

export default ReceiveAddressDetailScreen


const styles = StyleSheet.create({
    row: {
        paddingLeft: 30,
        alignItems: 'center',
        flexDirection: 'row',

    },
    textInput: {
        marginLeft: 30,
        fontSize: 15,

        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: 280
    },
    text: {
        fontSize: 15,
    }

})