
import { StyleSheet } from 'react-native'
import Color from './color'

const fontStyles = StyleSheet.create({
    midBlack: {
        fontSize: 16,
        color: 'black',
    },
    midGray: {
        fontSize: 16,
        color: Color.grayText,
    },
    midRed: {
        fontSize: 16,
        color: 'red',
    },
    midOrange: {
        fontSize: 16,
        color: 'orange',
    },
    midGreen: {
        fontSize: 16,
        color: Color.themeGreen,
    },
    midTheme: {
        fontSize: 16,
        color: Color.theme,
    },
    midWhite: {
        fontSize: 16,
        color: 'white',
    },

    black15: {
        fontSize: 15,
        color: 'black',
    },


    smBlack: {
        fontSize: 14,
        color: 'black',
    },
    smGray: {
        fontSize: 14,
        color: Color.grayText,
    },
    smRed: {
        fontSize: 14,
        color: 'red',
    },
    smOrange: {
        fontSize: 14,
        color: 'orange',
    },
    smWhite: {
        fontSize: 14,
        color: 'white',
    },
    smTheme: {
        fontSize: 14,
        color: Color.theme,
    },



    bigBlack: {
        fontSize: 18,
        color: 'black',
    },
    bigGray: {
        fontSize: 18,
        color: Color.grayText,
    },
    bigRed: {
        fontSize: 18,
        color: 'red',
    },


    bbbBlack: {
        fontSize: 22,
        color: 'black',
    },

    black30: {
        fontSize: 30,
        color: 'black',
    },

    white10: {
        fontSize: 10,
        color: 'white',
    },
    white12: {
        fontSize: 12,
        color: 'white',
    },



    gray10: {
        fontSize: 10,
        color: Color.grayText,
    },

    gray12: {
        fontSize: 12,
        color: Color.grayText,
        lineHeight: 15,
    },

})

export default fontStyles