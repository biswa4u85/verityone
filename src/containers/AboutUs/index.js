import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Text } from 'react-native'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images, Styles } from '@common'
import VerityAPI from '@services/VerityAPI'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './styles'

class AboutUs extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: Menu(),
    headerTitle: Logo(),
    headerRight: EmptyView(),
    headerStyle: Styles.Common.toolbarFloat,
  })

  constructor(props) {
    super(props)
    this.state = {
      searchtext: '',
      isLoading: false,
      searchResults: []
    }

    this.checkConnection = this.checkConnection.bind(this)
    this.stopAndToast = this.stopAndToast.bind(this)
  }

  componentDidMount() {

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
          <View style={styles.scanBoxTop}>
            <Text style={styles.catText}>About Us</Text>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)