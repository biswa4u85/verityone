import { Dimensions, Platform } from 'react-native';
import Constants from './Constants';
import Device from './Device'
import Color from './Color';
import Config from './Config';

const { height, width, heightWindow } = Dimensions.get('window');

let Styles = {
    width: Dimensions.get('window').width,
    height: Platform.OS !== 'ios' ? height : (height - 20),
    navBarHeight: Platform !== 'ios' ? (height - heightWindow) : 0,
    headerHeight: Platform.OS === 'ios' ? 40 : 56,
    thumbnailRatio: 1.2,

    app: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingTop: Device.ToolbarHeight,
    },
    FontSize: {
        tiny: 12,
        small: 14,
        medium: 16,
        big: 18,
        large: 20,
    },
    IconSize: {
        TextInput: 25,
        ToolBar: 18,
        Inline: 20,
    },
    FontFamily: {},
};

Styles.Common = {
    toolbarFloatActive: {
        backgroundColor: Color.botton,
    },
    logo: {
        width: Platform.OS === 'ios' ? 280 : 200,
        height: Platform.OS === 'ios' ? 40 : 40,
        resizeMode: "contain",
        ...Platform.select({
            ios: {
                marginTop: Device.isIphoneX ? -40 : Config.showStatusBar ? -4 : -15,
            },
            android: {
                marginTop: 2,
                marginLeft: 10
            }
        })
    },

    toolbar: {
        backgroundColor: Color.navigationBarColor,
        zIndex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        // marginTop: 25,
        paddingTop: 4,
        ...Platform.select({
            ios: {
                height: Config.showStatusBar ? (Device.isIphoneX ? 5 : 40) : (Device.isIphoneX ? 5 : 25),
            },
            android: {
                height: 46,
                paddingTop: 0,
                marginTop: 0,
            }
        })
    },

    toolbarIcon: {
        "width": 16,
        "height": 16,
        "resizeMode": "contain",
        "marginRight": 12,
        "marginBottom": 12,
        "marginLeft": 8,
        "opacity": 0.8,
        ...Platform.select({
            ios: {
                marginTop: Config.showStatusBar ? (Device.isIphoneX ? -20 : 7) : (Device.isIphoneX ? -30 : -3),
            },
            android: {
                marginTop: 10,
            }
        })
    },

    headerStyle: {
        color: Color.navigationTitleColor,
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        height: 40,
        fontFamily: Constants.fontFamily,
        ...Platform.select({
            ios: {
                marginBottom: !Config.showStatusBar ? 14 : 0,
                marginTop: Device.isIphoneX ? -10 : 12,
            },
            android: {
                marginBottom: 4
            }
        })
    },

};

export default Styles;