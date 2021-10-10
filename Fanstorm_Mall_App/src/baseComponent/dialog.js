import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'

export default class Dialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            msg: '',
            opacity: 0,
            isShow: false,
            isShowCancelButton: false,
            onOk: () => { },
            onCancel: () => { },
        }
    }

    alert(title, msg, onOk) {
        this.setState({
            title: title,
            msg: msg,
            isShow: true,
            isShowCancelButton: false,
            onOk: onOk ? onOk : () => { },
        })

    }

    confirm(title, msg, onOk, onCancel) {
        this.setState({
            title: title,
            msg: msg,
            isShow: true,
            isShowCancelButton: true,
            onOk: onOk ? onOk : () => { },
            onCancel: onCancel ? onCancel : () => { },
        })
    }

    ok() {
        this.setState({
            isShow: false
        }, () => {
            this.state.onOk()
        })
    }

    cancel() {
        this.setState({
            isShow: false
        }, () => {
            this.state.onCancel()
        })
    }

    renderCancelButton() {
        return (
            this.state.isShowCancelButton ?
                <TouchableOpacity style={styles.dialogButton}
                    onPress={() => { this.cancel() }}>
                    <Text style={styles.dialogButtonText}>Cancel</Text>
                </TouchableOpacity>
                :
                <View></View>
        )
    }
    renderOkButtton() {
        return (
            <TouchableOpacity style={styles.dialogButton}
                onPress={() => { this.ok() }}>
                <Text style={styles.dialogButtonText}>Ok</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const windowHeight = Dimensions.get('window').height;
        const windowWidth = Dimensions.get('window').width;
        let view = <View></View>
        if (this.state.isShow == true) {
            view = (
                <View style={[styles.container, { width: windowWidth, height: windowHeight }]}>
                    <View style={styles.dialogView}>
                        <View style={styles.dialogTitleView}>
                            <Text style={styles.dialogTitleText}>
                                {this.state.title}
                            </Text>
                        </View>
                        <View style={styles.dialogBodyView}>
                            <Text style={styles.dialogBodyText}>
                                {this.state.msg}
                            </Text>
                        </View>
                        <View style={styles.dialogButtonsView}>
                            {this.renderCancelButton()}
                            {this.renderOkButtton()}
                        </View>

                    </View>
                </View>
            )
        }
        else {
            view = <View></View>
        }
        return (
            <View>
                {view}
            </View>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backgroundColor: '#888',
        opacity: 0.8
    },

    dialogView: {
        borderRadius: 15,
        minWidth: 200,
        backgroundColor: 'white',
    },

    dialogTitleView: {
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    dialogTitleText: {
        fontSize: 14,
    },
    dialogBodyView: {
        padding: 20,
    },
    dialogBodyText: {
        fontSize: 15
    },
    dialogButtonsView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dialogButton: {
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 10,
    },
    dialogButtonText: {

    },

})