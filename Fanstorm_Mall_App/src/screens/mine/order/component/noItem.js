import React from 'react';
import { Text, View, Image } from 'react-native';

const noItem = (props) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Image source={require('../../../../../imgs/resultPage/noList.png')}></Image>
            <Text>{props.msg}</Text>
        </View>
    )
}

export default noItem