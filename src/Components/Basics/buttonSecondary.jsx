import { Button } from 'native-base';
import React from 'react'
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const MyButton= (props) => {
    const {
        children,
        onClick,
        color = "primary",
        ...buttonProps
    } = props;

    return (
        <Button {...buttonProps } onPress={onClick} style={color == "primary" ? styles.primary : styles.secondary}>{children}</Button>
    )
}

export default MyButton

const styles = StyleSheet.create({
    primary: {
        backgroundColor: colors.primary,
        borderRadius: 20
    },
    secondary: {
        backgroundColor: colors.secondary,
        borderRadius: 20
    }
})