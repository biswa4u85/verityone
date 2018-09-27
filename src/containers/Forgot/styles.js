import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    logoContainer: {
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
    },
    loginContainer: {
        flex: 1,
        padding: 20,
        margin: 10
    },
    input: {
        backgroundColor: Color.white,
        borderWidth: 1,
        flexGrow: 0.1,
        borderRadius: 15,
        padding: 10,
        borderColor: Color.grey,
        fontSize: 16,
        color: Color.black,
        marginVertical: 8,
        height: 40,
        shadowColor: Color.grey,
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    loginButton: {
        marginTop: 10,
        backgroundColor: Color.botton,
        borderRadius: 15,
        elevation: 1,
    },
    forgotPassword: {
        color: Color.botton,
        fontSize: 14,
        marginTop: 10,
        fontWeight: '500',
        textAlign: 'center',
        padding: 10
    },
    loginWith: {
        color: Color.grey,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 15,
        padding: 10,
    },
    socialContener: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    FacebookStyle: {
        margin: 5
    },
});