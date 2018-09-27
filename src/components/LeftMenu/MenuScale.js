/** @format */

'use strict'
import React, { PureComponent } from 'react'
import Menu from '@custom/react-native-drawer'
import { Platform } from 'react-native'
import { Events, Color, Constants } from '@common'
import { Drawer } from '@components'
import { EventEmitter } from '@app/Omni'

/**
 * MenuScale only support IOS
 */
export default class MenuScale extends PureComponent {
  componentDidMount() {
    this.sideMenuClick = EventEmitter.addListener(
      Constants.EmitCode.SideMenuOpen,
      this.tooggleMenu
    )
    this.sideMenuClose = EventEmitter.addListener(
      Constants.EmitCode.SideMenuClose,
      this.tooggleMenu
    )
  }

  componentWillUnmount() {
    this.sideMenuClick.remove()
    this.sideMenuClose.remove()
  }

  tooggleMenu = () => {
    if (typeof this.drawer != 'undefined') {
      this.drawer.toggle()
    }
  }

  render() {
    if (Platform.OS == 'android') {
      const drawerStyles = {
        drawer: { backgroundColor: 'rgba(37, 149, 242, 0.5)' },
        main: { paddingLeft: 0, paddingRight: 0 },
      }
      return (
        <Menu
          ref={(_drawer) => (this.drawer = _drawer)}
          type="overlay"
          tapToClose={true}
          panCloseMask={0.2}
          openDrawerOffset={0.2}
          styles={drawerStyles}
          useInteractionManager={true}
          content={<Drawer goToScreen={this.props.goToScreen} />}>
          {this.props.routes}
        </Menu>
      )
    }

    return (
      <Menu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="static"
        isScale={true}
        captureGestures={true}
        backgroundColor={Color.drawBackground}
        tweenHandler={Menu.tweenPresets.parallax}
        tapToClose={true}
        panCloseMask={0.25}
        openDrawerOffset={0.25}
        useInteractionManager={true}
        content={
          <Drawer
            backgroundMenu={Color.drawBackground}
            colorTextMenu="#FFF"
            goToScreen={this.props.goToScreen}
          />
        }>
        {this.props.routes}
      </Menu>
    )
  }
}
