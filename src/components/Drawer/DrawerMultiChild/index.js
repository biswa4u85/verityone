import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Image, I18nManager } from 'react-native'
import { Images } from "@common";
import { connect } from 'react-redux'
import { Text } from '@components'
import {
  Color,
  Config,
  Tools,
} from '@common'
import { DrawerButton } from '../DrawerButton'
import styles from './styles'

class DrawerMultiChild extends PureComponent {
  static propTypes = {
    backgroundMenu: PropTypes.string,
    colorTextMenu: PropTypes.string,
  }

  static defaultProps = {
    backgroundMenu: '#FFF',
    colorTextMenu: Color.blackTextPrimary,
  }

  constructor(props) {
    super(props)

    const { user } = props.userProfile
    // Config Menu
    if (user) {
      this.buttonList = [...Config.menu.listMenu, ...Config.menu.listMenuLogged]
    } else {
      this.buttonList = [
        ...Config.menu.listMenu,
        ...Config.menu.listMenuUnlogged,
      ]
    }

    this.state = {}
  }

  componentWillReceiveProps(props) {
    const { userProfile } = props

    if (userProfile && userProfile.user) {
      this.buttonList = [...Config.menu.listMenu, ...Config.menu.listMenuLogged]
    }
  }

  _handlePress = (item) => {
    const { goToScreen } = this.props
    goToScreen(item.routeName, item.params, false)
  }

  render() {
    const {
      userProfile,
      backgroundMenu,
      colorTextMenu,
    } = this.props
    const user = userProfile.user
    const avatar = (user && user.profileImage) ? { uri: user.profileImage } : Images.loginLogo
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundMenu,
          },
        ]}>
        <View
          style={[
            styles.avatarBackground,
            {
              backgroundColor: backgroundMenu,
            },
          ]}>
          <Image
            source={avatar}
            style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
          />

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.fullName,
                {
                  color: colorTextMenu,
                },
              ]}>
              {user ? user.name : ''}
            </Text>
            <Text
              style={[
                styles.email,
                {
                  color: colorTextMenu,
                },
              ]}>
              {user ? user.email : ''}
            </Text>
          </View>
        </View>
        <ScrollView>
          {this.buttonList.map((item, index) => (
            <DrawerButton
              {...item}
              key={index}
              onPress={() => this._handlePress(item)}
              uppercase
              colorText={colorTextMenu}
              textStyle={styles.textItem}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ user, netInfo }) => ({
  userProfile: user,
  netInfo
})

export default connect(mapStateToProps, null, null)(DrawerMultiChild)
