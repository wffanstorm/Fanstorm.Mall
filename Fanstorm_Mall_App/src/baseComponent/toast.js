import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native'

export default class Toast extends Component {
    constructor(props) {
        super(props)
        const windowHeight = Dimensions.get('window').height;

        this.state = {
            msg: 'hello world',
            position: windowHeight - 250,
            opacity: 0,
        }
    }

    show(msg) {
        this.setState({
            msg: msg,
            opacity: 1,
        })
        setTimeout(() => {
            this.setState({
                msg: '',
                opacity: 0,
            })
        }, 1000);
    }

    render() {

        return (
            <View style={[styles.container, { top: this.state.position, opacity: this.state.opacity }]}>
                <View style={styles.textView}>
                    <Text style={styles.text}>{this.state.msg}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999
    },

    textView: {
        backgroundColor: '#444',
        opacity: 0.9,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 15,
    }
})