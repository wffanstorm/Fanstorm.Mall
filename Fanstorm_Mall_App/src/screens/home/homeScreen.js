
import React, { useEffect } from 'react';
import testManager from '../../_test/testManager'

import {
    Text,
    View,
} from 'react-native';

const Home = (props) => {

    if (global.isDebug && testManager.isTest) {
        props.navigation.navigate("UnitTest")
    }


    useEffect(() => {
        global.nav = props.navigation
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
        return () => {
            console.log('home cleanup')
        }
    }, [])

    return (
        <View>
            <Text>Home</Text>
        </View>

    )
}

export default Home
