import React from 'react';
import { View, StatusBar } from 'react-native';
import { toast, closeDrawer } from './Omni';
import { Config, Device, Styles, } from "@common";
import { MyToast, MyNetInfo } from "@containers";
import Navigation from "@navigation"
import { connect } from 'react-redux'
import MenuSide from "@components/LeftMenu/MenuScale";

class Router extends React.PureComponent {

  goToScreen = (routeName, params) => {
    const { navigator } = this.refs;
    if (!navigator) {
      return toast('Cannot navigate');
    }
    navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName, params });
    closeDrawer();
  }

  render() {
    return (
      <MenuSide
        goToScreen={this.goToScreen}
        routes={<View style={Styles.app}>
          <StatusBar
            hidden={Device.isIphoneX ? false :
              !Config.showStatusBar}
          />
          <Navigation ref={'navigator'} />
          <MyToast />
          <MyNetInfo />
        </View>}
      />
    )
  }
}
export default connect(null)(Router)
