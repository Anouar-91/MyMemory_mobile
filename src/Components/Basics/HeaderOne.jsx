import {   View } from 'react-native'
import React from 'react'
import { Box, Text } from 'native-base';
import AppStyles from "../../constants/appStyles"
const HeaderOne = ({ width, children }) => {
    return (
        <View style={{ alignItems: 'baseline' }}>
            <View style={AppStyles.headerOneContainer}>
                <Text style={{ ...AppStyles.headerOne}}>{children}</Text>
                {
                    width &&(
                        <Box  marginLeft={6} marginBottom={6} padding={"1px"} bg={"black"} width={width}></Box>
                    )
                }
            </View>
        </View>

    )
}

export default HeaderOne

