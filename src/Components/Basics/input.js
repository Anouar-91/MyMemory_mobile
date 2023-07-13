import React from 'react'
import { Box, Input } from "native-base";

const MyInput = ({placeholder=""}) => {
    return (
        <Box style={{ marginBottom: 10 }}>
            <Input placeholder={placeholder} style={{}} />
        </Box>
    )
}

export default MyInput