import React from 'react'
import { Controller } from 'react-hook-form'
import { Select } from "native-base";
import {  CheckIcon } from "native-base";

const SelectHookForm = (props ) => {
    const {
        control,
        name,
        children,
        ...inputProps
      } = props;
  return (
    <Controller
    rules={{
      required: true,
    }}
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <Select
        {   ...inputProps}
        onBlur={onBlur}
        onValueChange={onChange}
        selectedValue={value}
        height={10}
        bg={"white"}
        minWidth="200"

        _selectedItem={{
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        mb={6}
      >
{children}
      </Select>
    )}
  />
  )
}

export default SelectHookForm