import React from 'react'
import { Controller } from 'react-hook-form'
import { Box, Input } from 'native-base';
import { StyleSheet } from 'react-native';

const InputHookForm = (props) => {
  const {
    control,
    name,
    label,
    required= false,
    isError = false,
    stylesProps,
    ...inputProps
  } = props;

  return (
    <Controller
      control={control}
      rules={{
        required: required,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box style={{ marginBottom: 10 }}>
          {label && (<Text style={styles.label}>{label}</Text>)}
          <Input
            style={{ ...styles.input, backgroundColor: isError ? "#E6B0AA" : "white", ...stylesProps }}
            {...inputProps}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        </Box>
      )}
      name={name}
    />
  )
}

export default InputHookForm

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 10,
    marginLeft: 0,
  },
  container: {
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