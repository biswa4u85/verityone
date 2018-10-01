import React, { Component } from 'react'
// import Camera from 'react-native-camera'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text, StyleSheet, } from 'react-native'
import { Icon } from 'native-base';
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import Parallax from 'react-native-parallax'
import { Spinner, ButtonIndex } from '@components'
// import ImagePicker from 'react-native-image-picker';
import { BarCodeScanner, Permissions } from 'expo';
import { Languages, Images, Color } from '@common'
import VerityAPI from '@services/VerityAPI'
import styles from './styles'

class Barcode extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            showCamera: true,
            hasCameraPermission: null,
            // cameraType: Camera.constants.Type.back
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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

    // _onBarCodeRead(e) {
    //     const { navigate } = this.props.navigation;
    //     const { setSearch } = this.props
    //     this.setState({ showCamera: false });
    //     setSearch(e.data)
    //     navigate('Search')
    // }


    handleBarCodeScanned = ({ type, data }) => {
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.topSearchArea}>
                    <TextInput
                        placeholder={"Search..."}
                        style={styles.searchBar}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <TouchableOpacity>
                        <Icon style={styles.flashIcon} name='flash' />                       
                    </TouchableOpacity>
                </View>
                <Text style={styles.scanTitle}>Please Scan</Text>
                <View style={{ height: 250, }}>
                    <BarCodeScanner
                        onBarCodeScanned={this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
                <View style={styles.footerArea}>
                    <Text style={styles.barTitle}>Place Barcode / QR In The Box</Text>
                    <Image style={styles.nfcImg} source={Images.nfc} />
                    <Text style={styles.nfcTxt}>Try NFC</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user })
const mapDispatchToProps = (dispatch) => {
    const { actions } = require('@redux/UserRedux')
    return {
        setSearch: (search) => dispatch(actions.setSearch(search)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Barcode)