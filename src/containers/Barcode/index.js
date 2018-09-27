import React, { Component } from 'react'
// import Camera from 'react-native-camera'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import Parallax from 'react-native-parallax'
import { Spinner, ButtonIndex } from '@components'
// import ImagePicker from 'react-native-image-picker';
import { Languages, Images, Color } from '@common'
import VerityAPI from '@services/VerityAPI'
import styles from './styles'

class Barcode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            showCamera: true,
            // cameraType: Camera.constants.Type.back
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
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

    _onBarCodeRead(e) {
        const { setSearch, onViewSearchScreen } = this.props
        this.setState({ showCamera: false });
        setSearch(e.data)
        onViewSearchScreen()
    }

    renderCamera() {
        const { showCamera, cameraType } = this.state;
        if (showCamera) {
            return (
                <View style={styles.scanBoxTop}>
                    <View style={styles.scanBoxInner}>
                        <TouchableOpacity><Image source={Images.top1} /></TouchableOpacity>
                        <TouchableOpacity style={styles.inlineItem}><Image style={styles.topImg} source={Images.top2} /><Text style={styles.searchText}>Search</Text></TouchableOpacity>
                    </View>
                    <View style={styles.scanBoxInner}>
                        <TouchableOpacity><Image style={styles.topImg} source={Images.top3} /></TouchableOpacity>
                        <TouchableOpacity><Image style={styles.topImg} source={Images.top4} /></TouchableOpacity>
                        <TouchableOpacity><Image style={styles.topImg} source={Images.top5} /></TouchableOpacity>
                    </View>
                </View>
                //     <View style={styles.scanBox}>
                //         <Text style={styles.scanText}>PLEASE SCAN</Text>
                //         <Image style={styles.barcodeBg} source={Images.barcodeBg} />
                //         <Text style={styles.barcodeText}>Put the Barcode / QR in the Square and Wait...</Text>
                //         <Image source={Images.scanIcon} />
                //         <Text style={styles.nfcText}>TRY NFC</Text>
                //     </View>
                // <Camera
                //     ref="cam"
                //     style={styles.container}
                //     aspect={Camera.constants.Aspect.fill}
                //     onBarCodeRead={this._onBarCodeRead.bind(this)}
                //     type={cameraType}>
                //     <View style={styles.scanBoxTop}>
                //         <View style={styles.scanBoxInner}>
                //             <TouchableOpacity><Image source={Images.top1} /></TouchableOpacity>
                //             <TouchableOpacity style={styles.inlineItem}><Image style={styles.topImg} source={Images.top2} /><Text style={styles.searchText}>Search</Text></TouchableOpacity>
                //         </View>
                //         <View style={styles.scanBoxInner}>
                //             <TouchableOpacity><Image style={styles.topImg} source={Images.top3} /></TouchableOpacity>
                //             <TouchableOpacity><Image style={styles.topImg} source={Images.top4} /></TouchableOpacity>
                //             <TouchableOpacity><Image style={styles.topImg} source={Images.top5} /></TouchableOpacity>
                //         </View>
                //     </View>
                //     <View style={styles.scanBox}>
                //         <Text style={styles.scanText}>PLEASE SCAN</Text>
                //         <Image style={styles.barcodeBg} source={Images.barcodeBg} />
                //         <Text style={styles.barcodeText}>Put the Barcode / QR in the Square and Wait...</Text>
                //         <Image source={Images.scanIcon} />
                //         <Text style={styles.nfcText}>TRY NFC</Text>
                //     </View>
                // </Camera>
            );
        } else {
            return
        }
    }

    render() {
        const { isLoading } = this.state;
        return (
            <View style={styles.container}>
                {this.renderCamera()}
                {isLoading ? <Spinner mode={'overlay'} /> : null}
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