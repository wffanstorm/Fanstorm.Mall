import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { PropTypes } from "prop-types";

const Counter = (props) => {
    const [value, setValue] = useState(Number(props.value))

    useEffect(() => {
        props.onValueChange(value)
    }, [value])

    const add = () => {
        setValue(value + 1)
    }

    const reduce = () => {
        props.canReduce(value,
            () => {
                setValue(value - 1)
            },
            () => { })
    }

    const onChangeText = (newText) => {
        setValue(Number(newText))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { reduce() }}
                style={[styles.btnView, { borderRightWidth: 1 }]}>
                <Image source={require('../../imgs/baseComponent/counter/reduce1.png')}
                    style={styles.img}></Image>
            </TouchableOpacity>
            <View style={styles.textView}>
                <TextInput
                    style={styles.textInput}
                    value={value.toString()}
                    keyboardType='numeric'
                    maxLength={3}
                    onChangeText={onChangeText}
                ></TextInput>
            </View>
            <TouchableOpacity
                onPress={() => { add() }}
                style={[styles.btnView, { borderLeftWidth: 1 }]}>
                <Image source={require('../../imgs/baseComponent/counter/add1.png')}
                    style={styles.img}></Image>
            </TouchableOpacity>
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', width: 100, height: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },

    btnView: {
        width: 29,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
    },

    textView: {
        width: 40, height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: { width: 40, height: 30, fontSize: 15, margin: 0, padding: 0, textAlign: 'center' },

    img: {
        width: 15, height: 15
    },

})