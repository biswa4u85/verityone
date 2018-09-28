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
    catText: {
        color: Color.grey,
        padding: 20,
        fontSize: 20,
    },
    userPointHeader:{
        flex:1,
        backgroundColor:Color.greyBg,
        flexDirection:'row',
        padding:10,
    },
    citizenLogo:{        
        flex:1,
        alignItems:'center',
        justifyContent:'center',        
        marginVertical:15,
    },
    logoImg:{
        width:100,
        height:100,        
    },
    tabBg: {
        backgroundColor: '#f7f7f7'
    },
    tabTxt: {
        color: '#000',
    },
    tabBorder: {
        borderRightWidth: 2,
        borderColor: '#007aff'
    },
    contentTitle:{
        fontSize:20,
        color:Color.black,
        paddingVertical:20,
        textAlign:'center',
    },
    helpBox:{
        backgroundColor:'#5c7cb7',
        padding:10,
        borderRadius:4,
        margin:20,
        marginTop:0,       
    },
    helpTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:Color.white,
    },
    helpTxt:{
        fontSize:14,        
        color:Color.white,
    },
    contentArea:{
        paddingHorizontal:20,
    },
    contentTxt:{
        fontSize:16,
        color:Color.black,
        marginBottom:15,
    },
    helpPopupBox:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
    },
    helpIconCapt:{
        fontSize:16,        
        color:Color.grey, 
        paddingLeft:10,        
    },
    concluTxt:{
        fontSize:16,
        paddingHorizontal:10,        
        color:Color.grey,
        marginVertical:15,
    },
});