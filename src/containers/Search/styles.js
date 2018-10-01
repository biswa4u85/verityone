import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    searchBox: {
        backgroundColor: '#EFEFEF',
        borderRadius: 4,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        height: 40,
    },
    searchImg1: {
        marginLeft: 10,
        marginRight: 10,
        width: 19,
        height: 19,
    },
    contentBox: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        flexDirection: 'column',
        padding: 16,
    },
    scanBox: {
        backgroundColor: '#FCCA1D',
        borderRadius: 4,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    loginContainer: {
        flex: 1,
        padding: 20,
        margin: 10
    },
    fill: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    image: {
        flex: 1,
        height: 130,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    overlay: {
        justifyContent: "center",
        backgroundColor: '#E9F6FF',
    },
    containerStyle: {
        shadowColor: "#000",
        backgroundColor: 'transparent',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 12 },
        elevation: 10,
        margin: 5,
    },
    dim_layout: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchResBox: {
        flex: 1,
        padding: 10
    },
    prodName: {
        fontSize: 16,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#C7C7C7',
        paddingBottom: 5,
        marginBottom: 5,
    },
    prodDetails: {
        flexDirection: 'row',
    },
    searchImg: {
        marginRight: 10,
        borderWidth: 1,
        width: 100,
        height: 70,
        borderColor: '#C7C7C7',
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
    },
    prodTxt: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    blueTxt: {
        fontSize: 13,
        color: '#088DF4',
        fontWeight: 'bold',
    },
    greyTxt: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },

    searchBar:{
        height: 40,
        width:'65%', 
        paddingHorizontal:10, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderColor:'#808787',
        fontSize:18,
        marginRight:15,
        borderRadius:4,
    },
    searchArea:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:15,
        marginHorizontal:10,
    },
    searchBtn:{
        borderRadius:4,
        borderWidth:1,
        borderColor:'#808787',
        paddingVertical:8,
        width:'30%'
    },
    searchBtnTxt:{
        fontSize:18,
        color:'#808787',
        textAlign:'center',
    },
});