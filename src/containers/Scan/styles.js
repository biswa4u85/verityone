import { StyleSheet } from 'react-native'
import { Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    loginContainer: {
        flex: 1,
        padding: 20,
        margin: 10
    },
    profileWrap: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    profileImg: {
        paddingVertical: 30,
        width: 70,
        height: 70,
        borderRadius: 10
    },
    loginButton: {
        marginTop: 10,
        backgroundColor: Color.botton,
        borderRadius: 15,
        elevation: 1,
    },
    fill: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    image: {
        flex: 1,
        height: 160,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    dim_layout: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    containerStyle: {
        shadowColor: "#000",
        backgroundColor: 'transparent',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 12 },
        elevation: 10,
    },
    picDetails: {
        backgroundColor: 'white',
    },
    h1: {
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 20,
        width: '87%',
    },
    rating: {
        alignItems: 'flex-end',
    },
    whiteTxt: {
        color: 'white',
        fontSize: 18,
    },
    TitleArea: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: "row",
    },
    picEditBox: {
        backgroundColor: '#3aa7ba',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 20,
        flexDirection: "row",
    },
    linkEdit: {
        color: 'white',
        fontSize: 18,
        marginRight: '74%',
    },
    linkDel: {
        color: 'white',
        fontSize: 18,
    },
    tagsArea: {
        flex: 1,
        padding: 5,
    },
    tagBox: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    tagTxt: {
        backgroundColor: '#f26f69',
        borderRadius: 12,
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        marginBottom: 5,
        marginRight: 3,
    },
    ratingBox: {
        backgroundColor: '#3aa7ba',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    scanBox: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    },
    scanText: {
        color: '#fff',
        fontSize: 24,
    },
    scanBoxWhite: {
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 20,
        width: '100%',
        borderRadius: 10
    },
    readyText: {
        color: '#8f8f8f',
        paddingTop: 20,
        fontSize: 24,
    },
    barcodeCancel: {
        alignItems: 'center',
        backgroundColor: '#d4d3d9',
        borderRadius: 10,
        margin: 20,
        width: '90%',
        padding: 10,
    },
    cancelText: {
        color: '#000',
        fontSize: 24,
    },
    barcodeBg: {
        margin: 20,
        marginTop: 50,
        marginBottom: 50,
    },
    barcodeSubmit: {
        alignItems: 'center',
    },
    nfcText: {
        color: '#fff',
        fontSize: 18,
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
});