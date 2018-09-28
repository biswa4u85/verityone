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
    fab: {
        position: 'absolute',
        overflow: 'hidden',
        bottom: 15,
        right: 12,
        height: 50,
        width: 130,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Color.botton,
        "elevation": 5,
        "shadowColor": "#000",
        "shadowOpacity": 0.2,
        "shadowRadius": 4,
        "shadowOffset": { width: 0, height: 2 }
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
        margin: 5,
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