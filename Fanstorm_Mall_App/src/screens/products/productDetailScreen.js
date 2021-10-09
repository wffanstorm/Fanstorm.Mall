
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

import RectButton from '../../baseComponent/button/rectButton'
import Toast from '../../baseComponent/toast'

import _productApi from '../../api/productApi'
import _cartApi from '../../api/cartApi'
import helper from '../../utils/helper'

import renderHtml from './productHtml'

const ProductDetailScreen = ({ navigation, route }) => {
    const [p, setProductDetail] = useState([]);
    const [webViewHeight, setWebViewHeight] = useState(0);
    const webview = useRef();
    const toast = useRef()

    useEffect(() => {
        _productApi.GetDetail(route.params.id,
            (resp) => {
                console.log(resp.data)
                resp.data.detail = renderHtml(resp.data.detail)
                setProductDetail(resp.data)
            },
            () => { })
    }, []);

    const addToCart = () => {
        let productId = route.params.id
        _cartApi.ChangeCartQuantity(productId, 1,
            (resp) => { toast.current.show('添加成功！') },
            (err) => { toast.current.show(err) })
    }

    const handleMessage = (e) => {
        console.log('webview handlemessage , e = ', e)
        setWebViewHeight(e.nativeEvent.data)
    }

    return (
        <View>
            <Toast ref={toast}></Toast>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: p.pic }} style={{ width: 412, height: 412 }}></Image>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
                    <View style={{ width: 300, height: 100, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 15 }}>{helper.getStrPre(p.name, 35)}</Text>
                        <Text style={{ fontSize: 13, color: 'gray', marginTop: 5 }}>{helper.getStrPre(p.description, 80)}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                        <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>{p.price}!</Text>
                    </View>
                </View>
                <WebView
                    ref={webview}
                    originWhitelist={['*']}
                    style={{ height: Number(webViewHeight), }}
                    onMessage={(e) => handleMessage(e)}
                    javaScriptEnabled={true}
                    source={{ html: p.detail, baseUrl: '' }}>
                </WebView>
                <View style={{ height: 80 }}></View>

            </ScrollView >
            <View style={{
                position: 'absolute', bottom: 0,
                backgroundColor: '#ddd', width: '100%', height: 70,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <RectButton title="加入购物车"
                    onPress={() => { addToCart() }}></RectButton>

            </View>
        </View >
    )

};

export default ProductDetailScreen
