
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import helper from '../../../utils/helper';
import fontStyles from '../../../utils/fontStyles'


const ProductItem = (props) => {
    let item = props.data
    return (
        <TouchableOpacity
            onPress={() => { props.goDetail() }}
            style={{
                flexDirection: 'row',
                backgroundColor: 'white', height: 160,
                marginTop: 10, borderRadius: 10,
                padding: 5
            }}>
            <View style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: item.pic }} style={{ width: 140, height: 140, borderRadius: 15 }}></Image>
            </View>
            <View style={{ flex: 1, height: 150, paddingTop: 20, paddingLeft: 7 }}>
                <Text style={[fontStyles.midBlack, { height: 25 }]}>{helper.getStrPre(item.name, 25)}</Text>
                <Text style={[fontStyles.smGray, { marginTop: 5, height: 55 }]}>{helper.getStrPre(item.description, 85)}</Text>
                <Text style={[fontStyles.bigRed, { marginTop: 10 }]}>￥{item.price}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default ProductItem