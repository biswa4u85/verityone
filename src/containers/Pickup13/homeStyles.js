import { StyleSheet } from 'react-native'
import { Color, Styles } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    topheader: {
        backgroundColor: '#537dbc',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    topText: {
        color: '#fff'
    },
    centerInfoBox: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ede7e7',
    },
    pickText: {
        color: '#000',
        paddingTop: 20,
    },
    botheader: {
        backgroundColor: '#db4a3e',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botText: {
        color: '#fff',
    },
});