import React from 'react';
import { Text, View, FlatList } from 'react-native';

import OrderItem from './orderItem'

import fontStyles from '../../../../utils/fontStyles';



const order = (props) => {
    let item = props.item
    return (
        <View style={{ backgroundColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 10 }}>
            <View style={{ justifyContent: 'space-between', }}>
                <Text style={[fontStyles.gray10]}>No.{item.id}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[fontStyles.smBlack, { marginRight: 10 }]}>{item.receiver_name}</Text>
                    <Text style={fontStyles.smBlack}>{item.receiver_phone}</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={item.items}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) =>
                        <OrderItem
                            item={item}
                        ></OrderItem>}
                />
            </View>
            <View>
                <Text>合计：￥{item.total_amount}</Text>
            </View>

        </View>
    )
}

export default order