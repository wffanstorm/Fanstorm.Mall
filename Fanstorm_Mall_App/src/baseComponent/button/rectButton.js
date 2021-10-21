import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

const RectButton = (props) => {
    const propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func.isRequired,
    }

    return (
        <View style={styles.btnView}>
            <TouchableOpacity
                onPress={() => props.onPress()}
                style={styles.btn}>
                <Text style={styles.btnTitle}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default RectButton

const styles = StyleSheet.create({

    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn: {
        width: 300,
        height: 50,
        backgroundColor: colors.theme,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTitle: {
        fontSize: 20,
        color: 'white',
    },

})