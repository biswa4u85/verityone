import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    scanBox: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    },
    scanBoxTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#161617',
    },
    scanBoxInner: {
        flexDirection: 'row',
    },
    inlineItem: {
        flexDirection: 'row',
    },
    topImg: {
        margin: 5,
        marginTop: 15,
    },
    searchText: {
        color: '#fff',
        marginTop: 15,
        fontSize: 24,
    },
    scanText: {
        color: '#fff',
        fontSize: 24,
    },
    barcodeBg: {
        margin: 20,
        marginTop: 40,
        marginBottom: 40,
    },
    barcodeText: {
        color: '#fff',
        marginBottom: 25,
        fontSize: 15,
    },
    nfcText: {
        color: '#fff',
        fontSize: 18,
    },
});