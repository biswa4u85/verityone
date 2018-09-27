import { StyleSheet } from 'react-native'
import { Styles, Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    containerPadding: {
        padding: 30,
    },
    label: {
        fontWeight: 'bold',
        fontSize: Styles.FontSize.large,
        color: Color.black,
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: Color.grey,
        color: Color.black,
        height: 40,
        marginTop: 10,
        padding: 0,
        margin: 0,
    },
    signUpButton: {
        marginTop: 20,
        backgroundColor: Color.primary,
        borderRadius: 5,
        elevation: 1,
    },
});