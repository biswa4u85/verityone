import React, { Component } from "react";
import { View, WebView } from 'react-native'
import { connect } from 'react-redux';
import FirebaseAuth from '@services/FirebaseAuth'
import { Spinner } from '@components'

class CustomPageScreen extends Component {
  static navigationOptions = () => ({
    header: null
  })

  componentDidMount() {

    const { state, navigate } = this.props.navigation;
    const { login, setParms } = this.props;

    if (typeof state.params.isLogout) {
      FirebaseAuth.doSignOut()
      login(null)
      setParms(null)
      navigate('Auth')
      return true
    }

  }

  render() {
    const { state } = this.props.navigation;

    if (typeof state.params == 'undefined') {
      return <View />
    }

    if (typeof state.params.url != 'undefined') {
      return <WebView source={{ url: state.params.url }} />
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