import React from 'react'

import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    goBack() {
        if (this.props.goBack) {
            this.props.goBack()
        }
    }

    render() {

        let goBackView = this.props.goBack ?
            (<TouchableOpacity style={styles.goBackView}
                onPress={() => { this.goBack() }}>
                <Text>返回</Text>
            </TouchableOpacity>)
            :
            (<View style={styles.goBackView}></View>)

        return (
            <View style={styles.container}>
                <View style={styles.leftView}>
                    {goBackView}
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                    </View>
                </View>
                <View style={styles.rightView}>
                    {/* <Text style={styles.titleText}>right</Text> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 2,
    },
    leftView: {
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    goBackView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    goBackImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    titleView: {
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText: {
        fontSize: 18,
    },

    rightView: {
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    }

})
