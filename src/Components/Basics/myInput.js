import React from 'react'
import { Box, Input, Text } from "native-base";
import { StyleSheet } from 'react-native';

const MyInput = ({
  label,
  isError = false,
  ...inputProps
} ) => {

      
    return (
        <Box style={{ marginBottom: 10 }}>
            {label && (<Text style={styles.label}>{label}</Text>)}
            <Input    style={{...styles.input, backgroundColor: isError ? "#E6B0AA" : "white"}} {...inputProps}  />
        </Box>
    )
}

export default MyInput

const styles = StyleSheet.create({
    label: {
      color: 'black',
      margin: 10,
      marginLeft: 0,
    },
    container: {
      flex: -1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: '#0e101c',
      borderWidth: 1
    },
    input: {
      backgroundColor: 'white',
      height: 40,
      padding: 10,
      borderRadius: 4,
    }
  });