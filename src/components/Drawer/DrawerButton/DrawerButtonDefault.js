import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Styles, Color, Constants, Languages } from '@common'

class DrawerButton extends PureComponent {
  render() {
    const { text, onPress, icon, uppercase, isActive, colorText, } = this.props
    const transText = text !== '' && Languages[text] ? Languages[text] : text
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.container,
          isActive && {
            borderLeftWidth: 1,
            borderColor: colorText,
          },
        ]}
        onPress={onPress}>
        <Icon name={icon} size={20} color={Color.white} />
        <Text
          style={[
            styles.text,
            I18nManager.isRTL && { paddingRight: 20 },
            colorText && {
              color: colorText,
            },
          ]}>
          {uppercase ? transText.toUpperCase() : transText}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Styles.Common.RowCenterLeft,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#a1bdf4',
    flex: 1,
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 4,
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.small,
    fontFamily: Constants.fontFamily,
    width: 200,
  },
})

DrawerButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  uppercase: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  colorText: PropTypes.string,
}
DrawerButton.defaultProps = {
  text: 'Default button name',
  onPress: () => alert('Drawer button clicked'),
  uppercase: false,
  isActive: false,
}

export default DrawerButton