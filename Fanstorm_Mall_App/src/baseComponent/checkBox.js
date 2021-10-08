import React from 'react';
import {
    StyleSheet,
    View,
    ViewPropTypes,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';


const CheckBox = (props) => {

    const propTypes = {
        value: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    }

    return (
        <TouchableOpacity style={{ width: 30, height: 30 }}
            underlayColor='transparent'
            disabled={props.disabled}
            onPress={() => { props.onPress() }}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 22, height: 22 }}
                    source={props.value ? require('../../imgs/baseComponent/checkBox/checked.png') :
                        require('../../imgs/baseComponent/checkBox/unchecked.png')}></Image>
            </View>
        </TouchableOpacity>
    )
}

export default CheckBox



