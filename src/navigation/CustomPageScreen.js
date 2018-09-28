import React, { Component } from "react";
import { View, WebView } from 'react-native'
import { connect } from 'react-redux';
import { Styles } from '@common'
import { Back, Logo, EmptyView } from './IconNav'
import { Spinner } from '@components'

class CustomPageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: Back(navigation),
    headerTitle: Logo(),
    headerRight: EmptyView(),
    headerStyle: Styles.Common.toolbarFloat,
  })

  constructor(props) {
    super(props)
    this.state = {
      reRander: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { state, navigate } = this.props.navigation;
    if (navigate !== prevProps.navigate) {
      if (typeof state.params.isLogout != 'undefined') {
        this.checkLogout()
      }
    }
  }

  checkLogout() {
    const { login, setParms } = this.props;
    const { state, navigate } = this.props.navigation;
    console.log('a')
    // FirebaseAuth.doSignOut()
    // login(null)
    // setParms(null)
    // navigate('Auth')
    return true
  }

  render() {
    const { login, setParms } = this.props;
    const { state, navigate } = this.props.navigation;

    if (typeof state.params.url != 'undefined') {
      return <WebView source={{ url: state.params.url }} />
    }

    if (typeof state.params.isLogout != 'undefined') {
      this.checkLogout()
    }

    return <Spinner mode={'overlay'} />

  }
}


const mapStateToProps = ({ netInfo, user }) => ({ netInfo, parms: user.parms })

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux/UserRedux');
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
    setParms: (parms) => dispatch(actions.setParms(parms))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomPageScreen);