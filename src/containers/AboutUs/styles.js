import React, { Platform, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { Color, Constants, Styles } from '@common';

const { width, height, scale } = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        width: width,
        paddingHorizontal: 10
    },
    flatcontainer: {
        height: height,
        flex: 10,

    },
    flatview: {
        justifyContent: 'center',
        // paddingTop: 30,
        borderRadius: 2,
        flexGrow: 3,
        backgroundColor: '#ffffff',
        margin: 5,
        padding: 10,
        borderRadius: 2,
        borderColor: '#9f9f9f',
        borderBottomWidth: 0,
        // shadowColor: '#666',
        // shadowRadius: 3,
        // elevation: 1,
        // // shadowOffset: { width: 2, height: 3 },
        // // shadowOpacity: 0.9,
        // shadowOffset: { width: 1, height: 3 },
        // shadowOpacity: 0.8

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    ImageIconStyle: {

        //  padding: 10,
        // margin:5,
        marginTop: 5,
        paddingTop: 10,
        height: 40,
        width: 40,
        borderRadius: 5,
        resizeMode: 'stretch',

    },
    mainContainer: {
        backgroundColor: '#ffffff',
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
    },
    labelText: {
        marginVertical: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4ac0f7'
    },

    itemLabel: {
        color: '#045781',
        fontSize: 16,
        textAlign: 'left',
    },


    itemStyleLeft: {
        justifyContent: 'center', width: '90%'
    },
    itemStyleRight: {
        justifyContent: 'center', width: '10%', alignItems: 'flex-end',
    },
    innerView:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',


    },
});