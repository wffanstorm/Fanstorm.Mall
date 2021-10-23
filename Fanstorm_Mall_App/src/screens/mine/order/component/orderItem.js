import React from 'react';
import { Text, View, Image } from 'react-native';

import helper from '../../../../utils/helper';


const orderItem = (props) => {
    let item = props.item
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#ddd', height: 100,
                marginTop: 10, borderRadius: 10,

            }}>
            <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: item.product_pic }} style={{ width: 90, height: 90, borderRadius: 10 }}></Image>
            </View>
            <View style={{ width: 240, height: 100, justifyContent: 'center', }}>
                <Text style={{ fontSize: 15 }}>{helper.getStrPre(item.product_name, 30)}</Text>
                <Text style={{ fontSize: 13, color: 'gray', marginTop: 5 }}>{helper.getStrPre(item.product_desc, 30)}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>￥{item.product_price}</Text>
                    <Text>x{item.quantity}</Text>
                </View>
            </View>
        </View>
    )
}

export default orderItem