import { StyleSheet } from "react-native";
import Colors from './colors'

export default StyleSheet.create({
    headerOne: {
        fontSize:25,
        padding:9,
        fontFamily:"Mostardesign-Sofia-Pro-Regular",
        marginTop:9
    },
    headerTwo: {
        fontSize:10,
        padding:9,
        fontFamily:"Mostardesign-Sofia-Pro-Regular",
    },
    headerOneContainer:{
        alignItems: 'baseline',
    },
    headerTwo : {
        fontSize:20,
        padding:9,
    },
    textBody : {
        fontSize:15,
        padding: 20
    },
    DrawerStyle:{
        backgroundColor: Colors.primary,
        color: Colors.white
    }
})