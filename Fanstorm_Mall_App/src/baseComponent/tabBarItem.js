import React from 'react'
import { Image } from 'react-native'

const TabBarItem = (props) => {
    let src = props.focused ? props.focusedImage : props.normalImage
    return (
        <Image
            source={src}
            style={{ width: 23, height: 23 }}
        />
    )
}

export default TabBarItem
