
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';

import Toast from '../../baseComponent/toast'
import RectButton from '../../baseComponent/button/rectButton'

import _userApi from '../../api/userApi'

const LoginScreen = (props) => {

    const toast = useRef()

    const [name, SetName] = useState('');
    const [pwd, SetPwd] = useState('');

    const login = () => {
        Keyboard.dismiss()
        _userApi.Login(name, pwd,
            (resp) => {
                let token = resp.data.token
                global.currentUser = {
                    accessToken: token
                }
                _userApi.GetInfo((resp2) => {
                    global.currentUser = {
                        userInfo: resp2.data,
                        accessToken: token
                    }

                    global.storage.save('currentUser', global.currentUser)

                    console.log(global.currentUser)
                    toast.current.show('登录成功！')
                    setTimeout(() => {
                        props.navigation.navigate('Mine');
                    }, 1000);
                })
            },
            (err) => { toast.current.show(err) })
    }

    const onChangeUserName = (newText) => {
        SetName(newText)
    }
    const onChangePwd = (newText) => {
        SetPwd(newText)
    }

    return (
        <View>
            <Toast ref={toast}></Toast>
            <View style={{ height: 100 }}></View>
            <View style={styles.row}>
                <Text style={styles.text}>账户：</Text>
                <TextInput
                    placeholder="请输入用户名"
                    style={styles.textInput}
                    text={name}
                    onChangeText={(newText) => { onChangeUserName(newText) }}
                ></TextInput>
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.row}>
                <Text style={styles.text}>密码：</Text>
                <TextInput
                    placeholder="请输入密码"
                    style={styles.textInput}
                    text={pwd}
                    secureTextEntry={true}
                    onChangeText={(newText) => { onChangePwd(newText) }}
                ></TextInput>
            </View>
            <View style={{ height: 20 }}></View>
            <RectButton title="Login" onPress={() => { login() }}></RectButton>
            <View></View>

        </View>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    row: {
        paddingLeft: 100,
        alignItems: 'center',
        flexDirection: 'row',

    },
    textInput: {
        fontSize: 15,

        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    text: {
        fontSize: 15,
    }

})