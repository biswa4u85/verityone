import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";
import {Color, Constants, Styles} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "wrap": {
        "flex": 1
    },
    "html": {
        "paddingLeft": 10,
        "paddingRight": 10
    },
    "body": {
        "paddingTop": Platform.OS == 'android' ? 0: 30,
        "backgroundColor": "#eee",
        "flex": 1
    },
    shareIcon:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Color.white,
        borderRadius:35,
        width:70,
        height:70,
    },
    shareIconSize:{
        fontSize:50,
        color:Color.black,
    },
    inviteArea:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop:100,
    }
});