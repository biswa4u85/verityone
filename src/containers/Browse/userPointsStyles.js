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
    scanBoxTop: {
        
    },   
    catText: {
        color: Color.grey,
        padding: 20,
        fontSize: 20,
    },
    userPointlist:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        borderTopWidth:1,
        borderColor:Color.grey,
    },
    listLeftTxt:{
        fontSize:20,
        color:Color.grey,
    },
    listRightTxt:{
        fontSize:20,
        color:Color.black,
    },
    fevoriteProdBox:{
        paddingBottom:30,
        width:'100%',
        flex:1,
    }
});