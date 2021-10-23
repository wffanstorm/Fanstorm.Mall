import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import colors from '../../../../utils/colors';

const orderListTopBtns = (props) => {

    let style1 = { paddingLeft: 5, paddingRight: 5 }
    let styleActive = [style1, { borderBottomWidth: 3, borderColor: colors.themeBlue }]
    const getBtnStyle = (no) => {
        if (no == props.status) return styleActive
        return style1
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
            <TouchableOpacity
                onPress={() => { props.onTopBtnPress(null) }}
                style={getBtnStyle(null)}>
                <Text>全部</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { props.onTopBtnPress(0) }}
                style={getBtnStyle(0)}>
                <Text>待发货</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { props.onTopBtnPress(1) }}
                style={getBtnStyle(1)}>
                <Text>待签收</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { props.onTopBtnPress(2) }}
                style={getBtnStyle(2)}>
                <Text>已完成</Text>
            </TouchableOpacity>
        </View>
    )

}

export default orderListTopBtns