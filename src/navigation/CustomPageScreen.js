import React, { Component } from "react";
import { View, WebView } from 'react-native'
import { connect } from 'react-redux';
import { Styles } from '@common'
import FirebaseAuth from '@services/FirebaseAuth'
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


  render() {
    const { login, setParms } = this.props;
    const { state, navigate } = this.props.navigation;

    if (typeof state.params.pageName != 'undefined' && state.params.pageName === 'Logout') {
      FirebaseAuth.doSignOut()
      login(null)
      setParms(null)
      navigate('Auth')
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