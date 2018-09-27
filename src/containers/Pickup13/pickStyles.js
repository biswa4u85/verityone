import { StyleSheet } from 'react-native'
import { Color, Styles } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
        backgroundColor: '#fff',
        padding: 15
    },
    topheader: {
        backgroundColor: '#537dbc',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    topText: {
        color: '#fff'
    },
    flipBut: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 40,
        backgroundColor: '#537dbc',
        padding: 5,
        color: 'white'
    },
    pickBut: {
        marginRight: 5,
        padding: 5,
        backgroundColor: '#db4a3e',
        color: 'white',
        borderRadius: 10,
    },
    discardBut: {
        padding: 5,
        backgroundColor: '#537dbc',
        color: 'white',
        borderRadius: 10,
    },
    centerInfoBox: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    noImg: {
        fontSize: 15,
        marginBottom: 40,
        padding: 10
    },
    tackpick: {
        backgroundColor: '#4e9e4f',
        padding: 10,
        marginTop: 50,
        marginBottom: 50,
        borderRadius: 5
    },
    pickText: {
        color: '#000',
        paddingTop: 20,
    },
    botheader: {
        backgroundColor: '#db4a3e',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botText: {
        color: '#fff',
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "#fff",
        justifyContent: 'center',
    },
    fill: {
        "flex": 1,
        "backgroundColor": "#ffffff"
    },
    image: {
        flex: 1,
        height: Styles.width / 2 - 60,
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
});