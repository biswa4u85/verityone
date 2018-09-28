import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, Platform, Share, Text } from 'react-native'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images, Styles } from '@common'
import VerityAPI from '@services/VerityAPI'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './styles'

class Invite extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: Menu(),
    headerTitle: 'Invite',
    headerRight: EmptyView(),
    headerStyle: Styles.Common.toolbarFloat,
  })

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }

    this.checkConnection = this.checkConnection.bind(this)
    this.stopAndToast = this.stopAndToast.bind(this)
  }

  doInvite() {
    const { user } = this.props
    let Share_Text = "Do you want to know more about your food or other products? Download Verity One and find out!";
    let and_store = 'https://play.google.com/store/apps/details?id=com.certified.verityscanningOne&referalCode';
    let ios_store = 'https://itunes.apple.com/us/app/verity-one/id1124462403?mt=8&referalCode';
    let env_OS = Platform.OS === 'ios' ? ios_store : and_store;
    Share.share({
      message: Share_Text + '\n' + env_OS + '=' + user.referalCode,
      title: 'My Referal Code Verity',
    }, {
        dialogTitle: 'Use my referal code',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter',
          'com.apple.uikit.activity.mail'
        ],
        tintColor: 'green'
      })
      .catch(err => console.log(err))
  }

  checkConnection() {
    const { netInfo } = this.props
    if (!netInfo.isConnected) toast(Languages.noConnection)
    return netInfo.isConnected
  }

  stopAndToast(msg) {
    toast(msg);
    error(msg);
    this.setState({ isLoading: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>

          <TouchableOpacity activeOpacity={1} onPress={() => this.doInvite()}>
            <Text style={styles.shareText} > Click To Share!</Text>
          </TouchableOpacity>

        </ScrollView>
        {isLoading ? <Spinner mode={'overlay'} /> : null}
      </View>
    );
  }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user, search: user.search })
const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux/UserRedux');
  return {
    setSearch: (search) => dispatch(actions.setSearch(search)),
    setSearchRes: (searchRes) => dispatch(actions.setSearchRes(searchRes)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Invite)