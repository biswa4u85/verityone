import { StyleSheet, } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Color.black,        
    },
    headerArea:{

    },
    footerArea:{
       alignItems:'center',
       justifyContent:'center', 
    },
    topSearchArea:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:15,
        paddingVertical:10,
        paddingHorizontal:10,
        borderBottomWidth:1,
        borderColor:Color.white,
    },
    searchBar:{
        height: 40,
        width:'80%', 
        paddingHorizontal:10, 
        borderColor: 'gray', 
        borderWidth: 0,
        fontSize:18,
    },
    flashIcon:{
        fontSize:32,
        color:Color.white,
    },
    scanTitle:{
        fontSize:24,
        fontWeight:'bold',
        color:Color.white,
        paddingVertical:15,
        textAlign:'center',
    },
    nfcImg:{
        width:69,
        height:49,
    },
    nfcTxt:{        
        fontSize:20,
        color:Color.white,
        fontWeight:'bold',
        paddingVertical:10,
        textAlign:'center',
    },
    barTitle:{
        fontSize:24,
        fontWeight:'bold',
        color:Color.white,
        paddingVertical:15,
        textAlign:'center',
    },
    
});