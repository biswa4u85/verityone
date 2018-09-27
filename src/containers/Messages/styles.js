import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    tabArea: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        marginTop: 4,
    },
    tabBg: {
        backgroundColor: '#f7f7f7'
    },
    tabTxt: {
        color: '#000',
    },
    tabBorder: {
        borderRightWidth: 2,
        borderColor: '#000000'
    },
    userArea: {
        marginTop: 50,
    },
    userImage: {
        width: 30,
        borderRadius: 5,
        height: 30,
    },
    privateArea: {
        position: 'absolute',
        width: '100%',
        height: 60,
        top: 60,
        left: 0,
    },
    privateBg: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#d2d2d2',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    privateTitle: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    addIcon: {
        position: 'absolute',
        right: 20,
        top: 0,
    },
    addIconTxt: {
        fontSize: 36,
        color: '#038bff'
    },
    bodyBg: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#9c9c9c',
        paddingTop: 20,
        paddingBottom: 10,
    },
    textMsg: {
        fontSize: 22,
        color: '#9c9c9c',
        textAlign: 'center',
    },
    pageIcon: {
        width: 120,
        height: 120,
    },
});