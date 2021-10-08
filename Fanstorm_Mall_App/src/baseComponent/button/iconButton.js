
import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import PorpTypes from 'prop-types'

/**
 * @property icon --required
 * @property onPress --required
 * @property style 
 * @returns A TouchableOpacity with an Image inside
 */
const IconButton = (props) => {

    const porpTypes = {
        icon: PorpTypes.object.isRequired,
        onPress: PorpTypes.func.isRequired,
        style: PorpTypes.object,
    }

    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={() => props.onPress()}>
            <Image
                style={{ width: props.style.width, height: props.style.height, resizeMode:'contain' }}
                source={props.icon}>
            </Image>
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 30,
    },
    icon: {
        flex: 1,

    }

})