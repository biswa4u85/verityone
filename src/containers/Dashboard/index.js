import React, { Component } from 'react';
// import * as firebase from 'firebase';
import { ScrollView, ImageBackground, TouchableOpacity, TextInput, Image, View, Text } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
// import SearchBar from 'react-native-search-bar';
import { Languages, Images } from "@common";
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux';
import Spinner from '@components/Spinner';
import FirebaseAPI from '@services/FirebaseAPI'
import Icon from 'react-native-vector-icons/EvilIcons'
import { Dashmenu } from '../../navigation/IconNav'
import styles from './styles'

// const advert = firebase.admob().interstitial('ca-app-pub-3325757019134880~7123715667');
// const Banner = firebase.admob.Banner;
// const AdRequest = firebase.admob.AdRequest;
// const request = new AdRequest();g
// request.addKeyword('foobar');

class Dashboard extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      user: '',
      // searchtext: '',
      picks: null,
      isLoading: false,

      visible: false,
      picked: null,
    };

    this.checkConnection = this.checkConnection.bind(this)
    this.stopAndToast = this.stopAndToast.bind(this)
  }

  componentDidMount() {
    const { user, setPicks } = this.props
    if (user) {
      this.setState({ isLoading: true })
      FirebaseAPI.getChild('picks', user.firebaseId, (success, data, error) => {
        if (success) {
          setPicks(data)
          this.setState({ isLoading: false })
        } else {
          console.log(error)
          this.setState({ isLoading: false })
        }
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { picks } = this.props
    if (picks !== prevProps.picks) {
      let tempPicks = []
      for (let item of Object.keys(picks)) {
        tempPicks.push(picks[item])
      }
      this.setState({ picks: tempPicks })
    }
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

  // _search() {
  //   const { searchtext } = this.state;
  //   const { setSearch, onViewSearchScreen } = this.props
  //   setSearch(searchtext)
  //   onViewSearchScreen()
  // }

  _randerPicks() {
    const { picks } = this.state;
    if (picks) {
      return picks.slice(0, 4).map((category, index) => {
        return <View key={index} style={styles.productBg}>
          <Image style={{ width: 75, height: 75 }} source={{ uri: category.photo }} />
          <View style={styles.addProd}><Image source={Images.addImg} /></View>
        </View>
      })
    } else {
      return <View style={styles.noDataBg}>
        <Icon name={'sc-soundcloud'} size={30} color={'#d6d6d6'} />
        <Text style={styles.noDataText}>Looks like you have no data!</Text>
      </View>
    }
  }

  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (picked) => {
    this.setState({
      picked: picked,
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }



  render() {
    const { onViewScanscreen, onViewScancreen } = this.props
    const { isLoading, picks, searchtext, visible, picked } = this.state;
    const options = [
      {
        key: 'kenya',
        label: 'Kenya',
      },
      {
        key: 'uganda',
        label: 'Uganda',
      },
      {
        key: 'libya',
        label: 'Libya',
      },
      {
        key: 'morocco',
        label: 'Morocco',
      },
      {
        key: 'estonia',
        label: 'Estonia',
      },
    ];
    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={require('../../images/store.png')}
            style={styles.dhashBoardHead}>
            {Dashmenu('white')}
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.pageTitle}>Verity One</Text>
              {/* <TouchableOpacity style={styles.shoppingPoint}><Text style={styles.shoppPointText}>Shopping in 33431</Text></TouchableOpacity> */}
              <View>
                <TouchableOpacity style={styles.shoppingPoint} onPress={this.onShow}>
                  <Text style={styles.shoppPointText}>Shopping in 33431 </Text>
                </TouchableOpacity>
                <Text>{picked}</Text>
                <ModalFilterPicker
                  visible={visible}
                  onSelect={this.onSelect}
                  onCancel={this.onCancel}
                  options={options}
                />
              </View>
            </View>
            <View style={styles.dashLogo}>
              <Image style={styles.dashLogoSize} source={Images.dashBoardLogo} />
            </View>


            {/* <SearchBar
              ref='searchBar'
              placeholder='Search'
              onChangeText={...}
              onSearchButtonPress={...}
              onCancelButtonPress={...}
            /> */}

          </ImageBackground>
          <View style={styles.contentBox}>
            <TouchableOpacity onPress={() => onViewScancreen()}>
              <View style={styles.scanBox}>
                <View style={styles.scanImg}><Image source={Images.welcomeImg} /></View>
                <View style={styles.wlcTxtArea}>
                  <Text style={styles.wlcTitleTxt}>Welcome to Verity One!</Text>
                  <Text style={styles.wlcsubTilTxt}>Start by scanning 5 of your fevorite products!</Text>
                </View>
              </View>
            </ TouchableOpacity>
            <View style={styles.recentScanBox}>
              <View style={styles.recentScanHeader}>
                <Text style={styles.recentScanTitle}>Recent Scan</Text>
                <TouchableOpacity onPress={() => onViewScanscreen()}><Text style={styles.viewMoreLink}>View More</Text></ TouchableOpacity>
              </View>
              <View style={styles.recentproduct}>
                {this._randerPicks()}
              </View>
            </View>
            <View style={styles.bottomAdd}>
              {/* <Banner
                unitId={'ca-app-pub-3325757019134880/3689945100'}
                size={"SMART_BANNER"}
                request={request.build()}
                onAdLoaded={() => {
                  console.log('Advert loaded');
                }}
              /> */}
            </View>
          </View>
          {isLoading ? <Spinner mode={'overlay'} /> : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user, picks: user.picks })
const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux/UserRedux');
  return {
    setPicks: (picks) => dispatch(actions.setPicks(picks)),
    setSearch: (search) => dispatch(actions.setSearch(search)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);