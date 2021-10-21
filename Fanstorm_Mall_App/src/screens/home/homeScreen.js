
import React, { useEffect } from 'react';
import testManager from '../../_test/testManager'

import {
    Button,
    Text,
    View,
} from 'react-native';

import Header from '../../baseComponent/header'

const Home = (props) => {

    if (global.isDebug && testManager.isTest) {
        console.log('UnitTest')
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
            <Header title='Home'></Header>
            <Button title='go' onPress={()=>{props.navigation.navigate('CreateOrderSuccess')}}></Button>
        </View>

    )
}

export default Home
