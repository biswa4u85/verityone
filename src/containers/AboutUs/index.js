import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList, Text } from 'react-native'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images, Color, Styles } from '@common'
import VerityAPI from '@services/VerityAPI'
import Icon from 'react-native-vector-icons/Entypo'
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
      isLoading: false,
      pageDetails: null
    }

    this.checkConnection = this.checkConnection.bind(this)
    this.stopAndToast = this.stopAndToast.bind(this)
  }

  componentDidMount() {
    const { user } = this.props
    this.setState({ isLoading: true });
    VerityAPI.getConfigurationsApi(user, (success, data, error) => {
      if (success) {
        for (let item of data.result.screen) {
          if (item.screenName === 'About Us') {
            this.setState({ pageDetails: item });
          }
        }
        this.setState({ isLoading: false });
      }
      else if (error) {
        console.log(error)
        this.setState({ isLoading: false });
        return this.stopAndToast(Languages.GetDataError);
      }
    });
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

  openWebView = (pageName, pageLink) => {
    const { navigate } = this.props.navigation;
    if (pageLink != "" && pageLink != "Location" && pageLink != null) {
      navigate('Custompage', { 'pageName': pageName, 'url': pageLink })
    }
    else if (pageLink == "Location") {
      navigate('Location')
    }
  }

  renderItem(data) {
    let { item, index } = data;
    let str = "";
    if (item.redirectUrl != "") {
      str = ">";
    }

    return (
      <View style={styles.flatview}>
        <TouchableOpacity activeOpacity={1} onPress={() => this.openWebView(item.itemName, item.redirectUrl)}>
          <View style={styles.innerView}>
            <View style={styles.itemStyleLeft}>
              <Text style={styles.itemLabel}>{item.itemName}</Text>
            </View>
            {(item.redirectUrl != "" && item.redirectUrl != "Location Summary" &&
              <View style={styles.itemStyleRight}>
                <Icon name={'arrow-bold-right'} size={20} color={Color.black} />
              </View>
            )}
          </View>

        </TouchableOpacity>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    const { isLoading, pageDetails } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text>{pageDetails ? pageDetails.screenName : ''}</Text>
          </View>
          <View style={[styles.row, styles.flatcontainer]}>
            <FlatList
              data={pageDetails ? pageDetails.items : null}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.itemId}
              onEndThreshold={0}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              refreshing={false}
              ItemSeparatorComponent={this.renderSeparator}
            />
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