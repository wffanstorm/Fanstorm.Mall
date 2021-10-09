
import React, { useEffect, useRef } from 'react';
import Toast from '../baseComponent/toast'

import {
    Text,
    View, TextInput, Button
} from 'react-native';

const UnitTest = (props) => {

    const toast = useRef()

    const onPress = () => {
        toast.current.show('hello world')
    }

    return (
        <View>
            <Text>UnitTest</Text>
            <Toast ref={toast}></Toast>
            <Button title='click me' onPress={() => { onPress() }}></Button>
        </View>

    )
}

export default UnitTest
