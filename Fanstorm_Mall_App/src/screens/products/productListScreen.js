
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

import ProductItem from './component/productItem'

import Header from '../../baseComponent/header'

import _productApi from '../../api/productApi'

const ProductListScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [produstList, setProdustList] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    let pageSize = 20

    const _getData = () => {
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

    const getData = (function () {
        let timer = null
        return function () {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                _getData()
            }, 100);
        }
    }())

    const onEndReached = () => {
        if (!hasNextPage) return
        setPageIndex(pageIndex + 1)
    }

    const onRefresh = () => {
        if (pageIndex == 1) {
            getData()
        }
        else {
            setPageIndex(1)
        }
    }

    useEffect(() => {
        getData()
    }, [pageIndex])

    const renderProductItem = (item) => {
        return (
            <ProductItem
                data={item}
                goDetail={() => { navigation.navigate("ProductDetail", { id: item.id }) }}>
            </ProductItem>
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
                        renderItem={({ item }) => renderProductItem(item)}
                        onEndReached={() => { onEndReached() }}
                        onEndReachedThreshold={0.5}
                        onRefresh={() => { onRefresh() }}
                        refreshing={isLoading}
                    />
                )}
            </View>
        </View>

    );
};

export default ProductListScreen
