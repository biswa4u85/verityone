import { StyleSheet } from 'react-native'
import { Styles, Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        // backgroundColor: Color.background,
    },
    dashMenu: {
        position: 'absolute',
        left: 10,
        top: 15,
    },
    dhashBoardHead: {
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#ffffff',
    },
    shoppingPoint: {        
        flexDirection: 'row',
        alignItems: 'center',        
    },
    shoppPointText:{
        color: '#C7C7C7',
        fontSize: 14,
    },
    shoppPointIcon:{
        color: '#C7C7C7',
        fontSize:24,
    },
    dashLogo: {
        paddingVertical:15,
        alignItems: 'center',
        marginVertical: 15,        
        backgroundColor:'#fff',
        borderRadius:50,
        width: 100,
        height:100,    
    },
    dashLogoSize: {
        width: 80,
        height:80,        
    },
    yellowTxt: {
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#FCCA1D',
        paddingBottom: 15,
    },
    searchBox: {
        width:'100%',
        backgroundColor: '#fff',
        borderRadius: 4,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        height: 40,
    },
    searchImg: {
        marginLeft: 10,
        marginRight: 10,
        width: 19,
        height: 19,
    },
    searchBar:{
        width:'100%',        
    },
    contentBox: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        flexDirection: 'column',
    },
    scanBox: {
        backgroundColor: '#59a153',
        borderRadius: 4,
        padding: 10,
        margin: 16,
        flexDirection: 'row',
    },
    scanImg: {        
        width: 57,
        height: 57,
        marginRight: 15,
    },
    scanText: {
        paddingTop: 8,
        flexDirection: 'column',
        flex: 1,
        fontSize: 17,
        color: '#000',
    },
    wlcTxtArea:{
        flex:1,
    },
    wlcTitleTxt: {      
        fontSize: 18,
        color: '#fff',
        fontWeight:'bold',
    },
    wlcsubTilTxt: {       
        fontSize: 14,
        color: '#fff',        
    },
    recentScanBox: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        marginBottom: 16,
    },
    recentScanHeader: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
    },
    recentScanTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#545454',
        width: '75%',
    },
    viewMoreLink: {
        fontSize: 14,
        color: '#0A8FF6',
    },
    recentproduct: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productBg: {
        backgroundColor: '#fff',
        marginRight: 5,
        alignItems: 'center',
        width: 77,
        padding: 10,
    },
    addProd: {
        position: 'absolute',
        height: 24,
        width: 24,
        right: 0,
        top: 0,
    },
    bottomAdd: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    noDataBg: {
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    noDataText: {
        fontSize: 25,
        color: '#d6d6d6',
    },
    
});