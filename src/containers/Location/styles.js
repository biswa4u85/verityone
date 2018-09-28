import React, { Platform, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { Color, Constants, Styles } from '@common';

const { width, height, scale } = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 10,
        width: 10,
        borderRadius: 5,
        resizeMode: 'stretch',

    },
    flatcontainer: {
        height: height,
        flex: 10,
        marginTop: Platform.OS === 'ios' ? '1%' : '5%',

    },
    Textborderline: {
        borderBottomColor: '#4cb5f5',
        borderBottomWidth: 1,
        width: '100%'
    },
    storeTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'blue',
        backgroundColor: '#5d90ef',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
        paddingBottom: 3
    },
    mainContainer: {
        backgroundColor: '#ffffff',
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 2,
        width: width

    },
    labelText: {
        marginVertical: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#426bb1'
    },
    labelTextResult: {
        //marginVertical: 15,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#426bb1'
    },
    maptext: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputBox: {
        flexGrow: 0.1,
        width: width - 20,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
        marginVertical: 10,
        paddingHorizontal: 16,
        height: 30
    },
    button1: {
        width: 100,
        height: 30,
        backgroundColor: '#426bb1',
        borderRadius: 5,
        marginVertical: 5,
        paddingVertical: 5,
        margin: 3,
        marginLeft: 2,
    },

    button2: {
        width: 100,
        height: 30,
        backgroundColor: '#426bb1',
        borderRadius: 5,
        marginVertical: 5,
        paddingVertical: 5,
        margin: 3,
    },
    button3: {
        width: 100,
        height: 30,
        backgroundColor: '#426bb1',
        borderRadius: 5,
        marginVertical: 5,
        paddingVertical: 5,
        margin: 3,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatview: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 2,
        flexGrow: 3,
        backgroundColor: '#fff',
        margin: 5,
        padding: 5,
        borderRadius: 2,
        borderColor: '#9f9f9f',
        borderBottomWidth: 0,
        height: height,
        color: "#000"
    },
    certifiedheadline: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 'auto',
        backgroundColor: 'white',
    },
    ImageStyle: {
        flex: 1,
        width: width,
        height: height,
        resizeMode: 'center',
    },
    nearestPlace: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#5d90ef',
    },
    nearestPlaceText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    takenPlace: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#5d90ef',
    },
    takenPlaceText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#5d90ef',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    belowPlace: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#5d90ef',
    },
    belowPlaceText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#5d90ef',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    ignoredPlace: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#5d90ef',
    },
    ignoredPlaceText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#5d90ef',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});