import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    searchBox: {
        backgroundColor: '#fff',
        borderRadius: 4,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        height: 40,
    },
    searchImg: {
        marginLeft: 10,
        marginRight: 10,
        width: 30,
        height: 30,
    },
    searchText: {
        height: 40,
        width: '100%',
        fontSize: 20,
        textAlign: 'left'
    },
    arrangeColomn: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catagoryContainer: {
        width: '48%',
        borderRadius: 5,
        backgroundColor: '#000',
        overflow: 'hidden',
        margin: '1%',
    },
    catagoryImage: {
        width: '100%',
        height: 180,
    },
    catBox: {
        // backgroundColor: '#000',
        // opacity: 0.5,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    greyTxt: {
        color: Color.white,
        padding: 10,
        fontSize: 20,
    },
    scanBoxTop: {
        flexDirection: 'row',
    },
    inlineItem: {
        flexDirection: 'row',
        padding: 20
    },
    searchText: {
        color: Color.grey,
        fontSize: 30,
    },
    catText: {
        color: Color.grey,
        padding: 20,
        fontSize: 20,
    },    
});