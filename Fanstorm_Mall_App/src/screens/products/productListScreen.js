
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../baseComponent/header'

import helper from '../../utils/helper'

import _productApi from '../../api/productApi'
import fontStyles from '../../utils/fontStyles';

const ProductListScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [produstList, setProdustList] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    let pageSize = 20

    const getData = () => {
        if (produstList.length == 0) {
            setLoading(true)
        }
        _productApi.GetList('', pageIndex, pageSize,
            (resp) => {
                if (resp.data.length < pageSize) {
                    setHasNextPage(false)
                }
                else {
                    setHasNextPage(true)
                }
                if (pageIndex == 1) {
                    setProdustList(resp.data)
                }
                else {
                    setProdustList(produstList.concat(resp.data))
                }
                setLoading(false)
            },
            () => { })
    }

    const onEndReached = () => {
        if (!hasNextPage) return
        setPageIndex(pageIndex + 1)
    }

    useEffect(() => {
        getData()
    }, [pageIndex])

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
        <View style={{ flex: 1 }}>

            <Header title='商品列表'></Header>

            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={produstList}
                        keyExtractor={({ id }, index) => id}
                        renderItem={renderItem}
                        onEndReached={() => { onEndReached() }}
                        onEndReachedThreshold={0.5}
                    />
                )}
            </View>

        </View>

    );
};

export default ProductListScreen
