import React from 'react'
import { Controller } from 'react-hook-form'
import MyInput from './myInput'

const InputHookForm = (props) => {
    const {
        control,
        name,
        ...inputProps
      } = props;
      
  return (
    <Controller
    control={control}
    rules={{
      required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <MyInput
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      {...inputProps} 
      />
    )}
    name={name}
  />
  )
}

export default InputHookForm