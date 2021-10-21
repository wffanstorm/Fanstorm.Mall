import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';

import Toast from '../../../baseComponent/toast'
import Dialog from '../../../baseComponent/dialog';
import RectButton from '../../../baseComponent/button/rectButton';
import fontStyles from '../../../utils/fontStyles';

import _userApi from '../../../api/userApi'


const rechargeScreen = (props) => {
    const toast = useRef()
    const dialog = useRef()

    const [value, setValue] = useState(0)

    const submit = () => {
        Keyboard.dismiss()
        _userApi.Recharge(value,
            (resp) => {
                toast.current.show('充值成功')
                setTimeout(() => {
                    props.navigation.goBack()
                }, 500);
            },
            (err) => { toast.current.show(err) }
        )
    }

    return (
        <View>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={fontStyles.midBlack}>请输入充值金额：</Text>
                <TextInput
                    value={value.toString()}
                    onChangeText={(newText) => { setValue(Number(newText)) }}
                    keyboardType='numeric'
                    style={{ borderBottomWidth: 1, borderColor: '#555', width: 100, marginBottom: 50 }}></TextInput>
                <RectButton
                    title='确认充值'
                    onPress={() => { submit() }}>
                </RectButton>
            </View>
        </View>
    )
}

export default rechargeScreen