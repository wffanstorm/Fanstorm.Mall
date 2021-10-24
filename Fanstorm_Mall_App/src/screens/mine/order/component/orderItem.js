import React from 'react';
import { Text, View, Image } from 'react-native';
import fontStyles from '../../../../utils/fontStyles';

import helper from '../../../../utils/helper';


const orderItem = (props) => {
    let item = props.item
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'white', height: 130,
                marginTop: 10, borderRadius: 10,
                padding: 5,
            }}>

            <View style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: item.product_pic }} style={{ width: 110, height: 110, borderRadius: 10 }}></Image>
            </View>

            <View style={{ flex: 1, height: 120, paddingTop: 12, paddingLeft: 5 }}>
                <Text style={[fontStyles.midBlack, { height: 25 }]}>{helper.getStrPre(item.product_name, 30)}</Text>
                <Text style={[fontStyles.smGray, { marginTop: 5, height: 32 }]}>{helper.getStrPre(item.product_desc, 30)}</Text>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                    <Text style={fontStyles.midRed}>￥{item.product_price}</Text>
                    <View >
                        <Text style={fontStyles.midBlack}>x{item.quantity}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default orderItem