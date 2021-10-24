
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import CheckBox from '../../../baseComponent/checkBox';
import Counter from '../../../baseComponent/counter';

import fontStyles from '../../../utils/fontStyles'
import helper from '../../../utils/helper';


const CartItem = (props) => {
    let item = props.data
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'white', height: 130,
                marginTop: 10, borderRadius: 10,
                padding: 5,
            }}>
            {props.canEditQuantity ?
                <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox value={item.is_checked} onPress={() => { props.check(item.id) }}></CheckBox>
                </View>
                : <View style={{ width: 5 }}></View>
            }

            <View style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: item.product_pic }} style={{ width: 110, height: 110, borderRadius: 10 }}></Image>
            </View>

            <View style={{ flex: 1, height: 120, justifyContent: 'center', }}>
                <Text style={fontStyles.midBlack}>{helper.getStrPre(item.product_name, 30)}</Text>
                <Text style={[fontStyles.smGray, { marginTop: 5 }]}>{helper.getStrPre(item.product_desc, 30)}</Text>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                    <Text style={fontStyles.midRed}>￥{item.price}</Text>
                    <View >
                        {props.canEditQuantity ?
                            <Counter
                                value={item.quantity.toString()}
                                onValueChange={(newValue) => { props.updateQuantity(newValue) }}
                                canReduce={(value, can, cant) => { props.canReduce(value, can, cant) }}>
                            </Counter>
                            : <Text style={fontStyles.midBlack}>x{item.quantity}</Text>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartItem