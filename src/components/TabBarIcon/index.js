'use strict';
import React, { PureComponent } from "react";
import { View, Platform, StyleSheet, Text, Image, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/Entypo'
// import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images, Styles, Color } from "@common";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textStyle: {
    color: 'black',
    fontSize: 12,
  },
});

class TabBarIcon extends PureComponent {

  render() {
    const { icon, name, type, tintColor } = this.props;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {type === 'Mat' ? <Icon name={icon} size={30} color={tintColor} /> : <Icon name={icon} size={30} color={tintColor} />}
      </View>
    );
  }
}

const mapStateToProps = ({ carts, wishList }) => ({ carts, wishList });
export default connect(mapStateToProps, null, null)(TabBarIcon);
