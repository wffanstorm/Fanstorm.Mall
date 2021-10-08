
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import _productApi from '../../api/productApi'
import helper from '../../utils/helper'

const ProductsScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [produstList, setProdustList] = useState([]);

    const getData = () => {
        _productApi.GetList('', 1, 10,
            (resp) => {
                console.log(resp.data)
                setProdustList(resp.data)
                setLoading(false)
            },
            () => { })
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log('ProductsScreen focus')
            getData()

            return () => {
                console.log('ProductsScreen unfocus')
            };
        }, [])
    );

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate("ProductDetail", { id: item.id }) }}
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#ddd', height: 100,
                    marginTop: 10, borderRadius: 10
                }}>
                <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item.pic }} style={{ width: 80, height: 80 }}></Image>
                </View>
                <View style={{ width: 230, height: 100, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 15 }}>{helper.getStrPre(item.name, 25)}</Text>
                    <Text style={{ fontSize: 13, color: 'gray', marginTop: 5 }}>{helper.getStrPre(item.description, 65)}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                    <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>{item.price}!</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={produstList}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default ProductsScreen
