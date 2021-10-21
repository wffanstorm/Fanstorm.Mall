
import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';

import Toast from '../../../baseComponent/toast'
import Dialog from '../../../baseComponent/dialog';
import RectButton from '../../../baseComponent/button/rectButton';
import fontStyles from '../../../utils/fontStyles';


const recharge = (props) => {
    const toast = useRef()
    const dialog = useRef()

    const [value, setValue] = useState(0)

    const submit = () => {
        Keyboard.dismiss()
        toast.current.show('充值金额为：' + value)
    }
    return (
        <View>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>
            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={fontStyles.midBlack}>请输入充值金额：</Text>
                <TextInput
                    value={value}
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

export default recharge