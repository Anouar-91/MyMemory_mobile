import { Box } from 'native-base'
import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const ToastBottom = () => {
  return (
    <Box style={{  zIndex: 9999, position: "absolute", bottom: 10,left: 10, right: 10}}>
    <Toast />
</Box>
  )
}

export default ToastBottom