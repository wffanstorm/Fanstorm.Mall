
import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button
} from 'react-native';


export default class Home extends React.Component {


    componentDidMount() {

        global.nav = this.props.navigation
        global.func.checkLogin = (hasLoginFun, notLoginFun) => {
            if (global.currentUser) {
                if (hasLoginFun) hasLoginFun()
            }
            else {
                if (notLoginFun) notLoginFun()
                global.nav.navigate('Login')
                // global.storage.load('user',
                //     (u) => {
                //         global.currentUser = u
                //         hasLoginFun()
                //     },
                //     () => {
                //         if (notLoginFun) notLoginFun()
                //         global.nav.navigate('Login')
                //     },
                // )
            }
        }

    }
    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>

        );
    }

}

