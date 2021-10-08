import { Platform } from 'react-native'

import { Dimensions, PixelRatio } from 'react-native'

const helper = {

    isIOS: Platform.OS === 'ios',

    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        onePixel: 1 / PixelRatio.get(),
    },

    values: {
        bottomTabHeight: 55,
    },

    check: {
        isPhone: (str) => {
            if (str == "") return false

            let digit = /^[0-9]{11}$/;
            if (digit.exec(str)) {
                return true
            }
            else {
                return false
            }
        },
    },

    newUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    numberTo2(num) {
        if (num < 10)
            return '0' + num
        return num
    },

    numFix2(num) {
        return Number(num).toFixed(2)
    },


    getStrLen(str) {
        let len = 0;
        len = (str + '').replace(/[^\u0000-\u00ff]/g, "aa").length
        return len;
    },

    getStrPre(str, len) {
        if (helper.getStrLen(str) <= len) {
            return str
        }
        else {
            for (let i = str.length - 1; i > 0; i--) {
                let subStr = str.substring(0, i)
                if (helper.getStrLen(subStr) <= len) {
                    return subStr + '...'
                }
            }
        }
    },

    getLocation(data, len) {
        let res = data.province + ' ' + data.city + ' ' + data.region + data.detailAddress
        res = helper.getStrPre(res, len)
        return res
    },

    toDistance(num) {
        if (num < 1000)
            return num + 'm'
        else {
            num = num / 1000
            num = Number(num).toFixed(1)
            return num + 'km'
        }
    },

}

export default helper