import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import RectButton from '../../../baseComponent/button/rectButton';

import _userReceiveAddressApi from '../../../api/userReceiveAddressApi'

const ReceiveAddressListScreen = (props) => {
    const [listData, setListData] = useState([]);

    const getData = () => {
        _userReceiveAddressApi.GetList((resp) => {
            setListData(resp.data)
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log('ReceiveAddressListScreen focus')
            getData()

            return () => {
                console.log('ReceiveAddressListScreen unfocus')
            };
        }, [])
    );

    const setDefault = (id) => {
        _userReceiveAddressApi.SetDefault(id, () => {
            getData()
        })
    }

    const readerItem = ({ item }) => {

        let c = item.is_default == 1 ? 'green' : 'gray'

        return (
            <View style={{
                flexDirection: 'row', padding: 10, margin: 5, marginTop: 10,
                justifyContent: 'space-between', backgroundColor: '#ddd', borderRadius: 20,
            }}>

                <View style={{ flexDirection: 'row', width: 300 }}>
                    <View style={{ width: 26, height: 26, alignSelf: 'center' }}>
                        <TouchableOpacity
                            style={{
                                width: '100%', height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: c,
                                borderRadius: 30
                            }}
                            onPress={() => setDefault(item.id)}>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 10, width: 250 }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ marginLeft: 20 }}>{item.phone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5, width: '100%', }}>
                            <Text style={{ flexWrap: 'wrap', flex: 1 }}>
                                {item.province} {item.city} {item.region} {item.detail_address}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: 80, height: 50, }}>
                    <TouchableOpacity
                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => props.navigation.navigate("ReceiveAddressDetail", { item })}>
                        <Image style={{ width: 27, height: 27, resizeMode: 'contain' }}
                            source={require('../../../../imgs/mine/mineAddressEdit.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={listData}
                keyExtractor={({ id }, index) => id}
                renderItem={readerItem}
            />
            <View style={{ marginTop: 20 }}>
                <RectButton title="Add New" onPress={() => { props.navigation.navigate("ReceiveAddressDetail") }}></RectButton>
            </View>
        </View>
    );
};

export default ReceiveAddressListScreen
