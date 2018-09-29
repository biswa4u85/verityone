import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
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
        width:'100%',
    },
    arrowIcon:{
        fontSize:36,
        color:Color.grey,
    },
    
});