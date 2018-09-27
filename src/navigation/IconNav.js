import React from "react";
import { TouchableOpacity, Platform, View, Text, Image } from 'react-native';
import { Styles, Images, Constants } from '@common'
import { openDrawer } from "@app/Omni"

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };

const Logo = () => (
    <Image source={Images.LogoImage} style={Styles.Common.logo} />
)

const Menu = (color = '') => (
    <TouchableOpacity hitSlop={hitSlop} onPress={openDrawer}>
        <Image source={(color === 'white') ? Images.iconMenuWhite : Images.iconMenu} style={[Styles.Common.toolbarIcon]} />
    </TouchableOpacity>
)

const Dashmenu = (color = '') => (
    <TouchableOpacity style={{ position: 'absolute', left: 10, top: 15 }} hitSlop={hitSlop} onPress={openDrawer}>
        <Image source={(color === 'white') ? Images.iconMenuWhite : Images.iconMenu} style={[Styles.Common.toolbarIcon]} />
    </TouchableOpacity>
)

const EmptyView = () => <View style={[
    Styles.Common.Row,
    Constants.RTL ? { left: -10 } : { right: -5 },
    Platform.OS !== 'ios' && { right: -12 }]} />

const Back = (navigation, iconBack) => (<TouchableOpacity
    hitSlop={hitSlop}
    onPress={() => {
        navigation.goBack(null)
    }}>
    <Image source={Images.iconBack}
        style={[Styles.Common.toolbarIcon, iconBack && Styles.Common.iconBack]} />
</TouchableOpacity>)

export { Back, Logo, Menu, Dashmenu, EmptyView }