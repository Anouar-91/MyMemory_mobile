import {   View } from 'react-native'
import React from 'react'
import { Box, Text } from 'native-base';
import AppStyles from "../../Constants/AppStyles"
const HeaderOne = ({ width, children }) => {
    return (
        <View style={{ alignItems: 'baseline' }}>
            <View style={AppStyles.headerOneContainer}>
                <Text style={{ ...AppStyles.headerOne, marginLeft: 6 }}>{children}</Text>
                <Box  marginLeft={6} marginBottom={6} padding={"1px"} bg={"black"} width={width}></Box>

            </View>
        </View>

    )
}

export default HeaderOne

