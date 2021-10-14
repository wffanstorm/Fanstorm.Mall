
import React, { useEffect, useRef } from 'react';
import Toast from '../baseComponent/toast'
import Dialog from '../baseComponent/dialog';

import {
    Text,
    View, TextInput, Button
} from 'react-native';
import Header from '../baseComponent/header';

const UnitTest = (props) => {

    const toast = useRef()
    const dialog = useRef()

    const onPress = () => {
        dialog.current.confirm('确认', '确定要删除该地址吗？',
            () => {
                toast.current.show('you click ok')
            },
            () => {
                toast.current.show('you click cancel')
            }
        )
    }

    return (
        <View>
            <Toast ref={toast}></Toast>
            <Dialog ref={dialog}></Dialog>

            <Text>UnitTest</Text>
            <Button title='click me' onPress={() => { onPress() }}></Button>

            <Header title='UnitTest Page'
                goBack={() => { onPress() }}
            ></Header>
        </View>

    )
}

export default UnitTest
