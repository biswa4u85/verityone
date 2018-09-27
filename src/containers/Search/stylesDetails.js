import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
        padding: 10
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
        color: '#545454',
        textAlign: 'center',
    },
    prodImg: {
        flex: 1,
        marginBottom: 20,
    },
    listDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
        color: '#088DF4',
        backgroundColor: '#DCDCDC',
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    listCont: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
    },
    listRow: {
        flexDirection: 'row',
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
    },
    listTxt: {
        fontSize: 14,
        color: '#000',
        marginRight: 20,
    },
    listTxtBlue: {
        textAlign: 'right',
        color: '#088DF4',
    },
    mapArea: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#999',
    },
    footerArea: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    buttonBg: {
        backgroundColor: '#008EFC',
        borderRadius: 4,
        padding: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 3,
        marginLeft: 3,
    },
    buttonTxt: {
        fontSize: 14,
        color: '#fff',
    },
    buttonBigBg: {
        backgroundColor: '#fff',
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#008EFC',
        padding: 8,
        paddingLeft: 55,
        paddingRight: 55,
        marginRight: 3,
        marginLeft: 3,
    },
    buttonBlkTxt: {
        fontSize: 14,
        color: '#000',
    },
});