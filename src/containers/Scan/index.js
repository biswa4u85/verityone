import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import Parallax from 'react-native-parallax'
import { Spinner, ButtonIndex } from '@components'
// import ImagePicker from 'react-native-image-picker';
// import { RNCamera } from 'react-native-camera';
import { Languages, Images, Color } from '@common'
import FirebaseAPI from '@services/FirebaseAPI'
import styles from './styles'

class Scan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            picks: null
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

    // selectPhotoTapped() {
    //     const options = {
    //         quality: 1.0,
    //         maxWidth: 500,
    //         maxHeight: 500,
    //         storageOptions: {
    //             skipBackup: true
    //         }
    //     };

    //     ImagePicker.launchCamera(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled photo picker');
    //         }
    //         else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         }
    //         else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         }
    //         else {
    //             this.setState({ isLoading: true });
    //             FirebaseAPI.uploadFile(response, 'visionImages', (success, dataUrl, error) => {
    //                 if (success) {
    //                     FirebaseAPI.visionUploadImages(dataUrl, (success, data, error) => {
    //                         this.setState({ picks: [{ photo: dataUrl, points: data.length, tags: data }] });
    //                         this.setState({ isLoading: false });
    //                     });
    //                 }
    //                 else if (error) {
    //                     this.setState({ isLoading: false });
    //                     return this.stopAndToast(Languages.GetDataError);
    //                 }
    //             });

    //         }
    //     });
    // }

    saveScan() {
        const { picks } = this.state
        const { user, setPicks, onViewScansScreen } = this.props
        if (picks) {
            this.setState({ isLoading: true })
            FirebaseAPI.createChild(picks[0], 'picks', user.firebaseId, (success, data, error) => {
                if (success) {
                    FirebaseAPI.getChild('picks', user.firebaseId, (success, data, error) => {
                        if (success) {
                            setPicks(data)
                            onViewScansScreen()
                            this.setState({ picks: null });
                            this.setState({ isLoading: false })
                        }
                    })
                }
            })
        } else {
            return this.stopAndToast(Languages.GetDataError);
        }
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)

            this.setState({ isLoading: true });
            FirebaseAPI.uploadFile(data, 'visionImages', (success, dataUrl, error) => {
                if (success) {
                    FirebaseAPI.visionUploadImages(dataUrl, (success, data, error) => {
                        this.setState({ picks: [{ photo: dataUrl, points: data.length, tags: data }] });
                        this.setState({ isLoading: false });
                    });
                }
                else if (error) {
                    this.setState({ isLoading: false });
                    return this.stopAndToast(Languages.GetDataError);
                }
            });
        }
    };

    removePick(item) {
        this.setState({ picks: null });
    }

    randerPicks() {
        const { picks } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <Parallax.ScrollView style={styles.fill}>
                    {picks.map((category, index) => {
                        return <Parallax.Image
                            key={index}
                            onPress={() => { }}
                            style={styles.image}
                            overlayStyle={styles.overlay}
                            containerStyle={styles.containerStyle}
                            parallaxFactor={0.4}
                            source={{ uri: category.photo }}>
                            <View style={styles.dim_layout}>
                                <View style={styles.tagsArea}>
                                    {category.tags ? <View style={styles.tagBox}>
                                        {category.tags.map((tag, index) => {
                                            return <Text key={index} style={styles.tagTxt}>{tag}</Text>
                                        })}
                                    </View> : ''}
                                </View>
                                <View style={styles.picEditBox}>
                                    <Text style={styles.linkEdit}>{category.points}</Text>
                                    <Text style={styles.linkDel} onPress={() => this.removePick(category)}>Delete</Text>
                                </View>
                            </View>
                        </Parallax.Image>
                    })}
                </Parallax.ScrollView>
            </View>
        )
    }


    render() {
        const { isLoading, picks } = this.state
        const { onViewScansScreen } = this.props
        if (picks) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {this.randerPicks()}
                        <View style={styles.loginContainer}>
                            {/* <View style={styles.profileWrap}>
                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                    <Image style={styles.profileImg} resizeMode='cover' source={Images.upload} />
                                </TouchableOpacity>
                                <Text style={styles.profileText}>{Languages.scanImg}</Text>
                            </View> */}
                            <ButtonIndex text={Languages.submit} textColor={Color.white} containerStyle={styles.loginButton} onPress={() => this.saveScan()} />
                        </View>
                    </ScrollView>
                    {isLoading ? <Spinner mode={'overlay'} /> : null}
                </View>
            );
        } else {
            return <View style={[styles.container, { backgroundColor: '#000' }]}>
                {/* <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                /> */}
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
                <View style={styles.scanBox}>
                    <Text style={styles.scanText}>PLEASE SCAN</Text>
                    <View style={styles.scanBoxWhite}>
                        <Text style={styles.readyText}>Ready to Scan</Text>
                        <Image style={styles.barcodeBg} source={Images.mobIcon} />
                        <TouchableOpacity style={styles.barcodeCancel} onPress={() => onViewScansScreen()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.barcodeSubmit} onPress={this.takePicture.bind(this)}>
                        <Image source={Images.scanIcon} />
                        <Text style={styles.nfcText}>TRY NFC</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View>
        }
    }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user })
const mapDispatchToProps = (dispatch) => {
    const { actions } = require('@redux/UserRedux')
    return {
        setPicks: (picks) => dispatch(actions.setPicks(picks)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Scan)