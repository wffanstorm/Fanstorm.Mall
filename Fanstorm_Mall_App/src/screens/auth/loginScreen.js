
import { BUILDER_KEYS } from '@babel/types';
import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TouchableOpacity,
    TextInput
} from 'react-native';

import userApi from '../../api/userApi'

import RectButton from '../../baseComponent/button/rectButton'



export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            pwd: "",
        }
    }
    componentDidMount() {

    }

    login() {
        userApi.Login(this.state.name, this.state.pwd,
            (resp) => {
                let token = resp.data.token
                global.currentUser = {
                    accessToken: token
                }
                userApi.GetInfo((resp2) => {
                    global.currentUser = {
                        userInfo: resp2.data,
                        accessToken: token
                    }
                    console.log(global.currentUser)
                    this.props.navigation.navigate('Mine');
                })
            },
            (ex) => { alert(ex) })
    }

    onChangeUserName(newText) {
        this.setState({
            name: newText
        })
    }
    onChangePwd(newText) {
        this.setState({
            pwd: newText
        })
    }

    render() {
        return (
            <View>
                <View style={{ height: 100 }}></View>
                <View style={styles.row}>
                    <Text style={styles.text}>账户：</Text>
                    <TextInput
                        placeholder="请输入用户名"
                        style={styles.textInput}
                        text={this.state.name}
                        onChangeText={(newText) => { this.onChangeUserName(newText) }}
                    ></TextInput>
                </View>
                <View style={{ height: 20 }}></View>
                <View style={styles.row}>
                    <Text style={styles.text}>密码：</Text>
                    <TextInput
                        placeholder="请输入密码"
                        style={styles.textInput}
                        text={this.state.pwd}
                        onChangeText={(newText) => { this.onChangePwd(newText) }}
                    ></TextInput>
                </View>
                <View style={{ height: 20 }}></View>
                <RectButton title="Login" onPress={() => { this.login() }}></RectButton>
                <View></View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    row: {
        paddingLeft: 100,
        alignItems: 'center',
        flexDirection: 'row',

    },
    textInput: {
        fontSize: 15,

        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    text: {
        fontSize: 15,
    }

})