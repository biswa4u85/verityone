import React from 'react';
import { AsyncStorage, ScrollView, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Parallax from 'react-native-parallax'
import { connect } from 'react-redux'
import { Content, Grid, Col, Item, Text } from 'native-base';
import { Images,Styles } from '@common'
import { Camera, Location, Permissions } from 'expo';
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import FirebaseAPI from '@services/FirebaseAPI'

import styles from './pickStyles'

class Pick extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: Menu(),
        headerTitle: Logo(),
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloat,
    })

    constructor(props) {
        super(props)
        this._handlePress = this._handlePress.bind(this)
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        location: null,
        openCamera: false,
        isLoading: false,
        photo: null,
        title: null,
        points: null,
        tags: [],
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

        let { statusLocation } = await Permissions.askAsync(Permissions.LOCATION);
        if (statusLocation !== 'granted') {
            return;
        }
        this._getLocationAsync();

    }

    _getLocationAsync = async () => {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: JSON.stringify(location) });
    };

    randerTags(tags) {
        const { isLoading } = this.state
        if (isLoading) {
            return <View style={styles.tagBox}>
                <ActivityIndicator color={'#fff'} />
            </View>
        } else if (tags) {
            return <View style={styles.tagBox}>
                {tags.map((tag, index) => {
                    return <Text key={index} style={styles.tagTxt}>{tag}</Text>
                })}
            </View>
        }
    }

    showImg() {
        if (this.state.photo) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <Parallax.Image
                        onPress={() => { }}
                        style={styles.image}
                        overlayStyle={styles.overlay}
                        containerStyle={styles.containerStyle}
                        parallaxFactor={0.4}
                        source={{ uri: this.state.photo }}>
                        <View style={styles.dim_layout}>
                            <View style={styles.tagsArea}>
                                {this.randerTags(this.state.tags)}
                            </View>
                        </View>
                    </Parallax.Image>
                </View>
            )
        }
    }

    async _getFlip(data) {

        this.setState({
            openCamera: false,
            photo: data.uri
        });
        this.setState({ isLoading: true })
        let imageTags = await FirebaseAPI.visionUploadImages(data.uri);
        // console.log(imageTags)
        if (imageTags) {
            this.setState({ title: '' })
            this.setState({ points: imageTags.length })
            this.setState({ tags: imageTags })
            this.setState({ isLoading: false })
        } else {
            this.setState({ isLoading: false })
        }
    }

    async _handlePress() {
        const { navigation, setPicks } = this.props
        if (this.state.photo) {
            if (await AsyncStorage.getItem('@pick:myPicks')) {
                let myPicks = JSON.parse(await AsyncStorage.getItem('@pick:myPicks'))
                myPicks.push({ title: this.state.title, photo: this.state.photo, points: this.state.points, tags: this.state.tags })
                await AsyncStorage.setItem('@pick:myPicks', JSON.stringify(myPicks));
                setPicks(myPicks)
            } else {
                let myPicks = []
                myPicks.push({ title: this.state.title, photo: this.state.photo, points: this.state.points, tags: this.state.tags })
                await AsyncStorage.setItem('@pick:myPicks', JSON.stringify(myPicks));
                setPicks(myPicks)
            }
        }
        await navigation.navigate('PicksScreen')
        await this.setState({ photo: null });
    }

    render() {
        const { hasCameraPermission, openCamera } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (hasCameraPermission === true && openCamera === true) {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
                        <View style={{ flex: 13, flexDirection: 'row', backgroundColor: 'transparent' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text style={styles.flipBut}>Flip or Swap</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent' }}>
                            <TouchableOpacity
                                // style={styles.pickBut}
                                onPress={() => {
                                    if (this.camera) {
                                        this.camera.takePictureAsync()
                                            .then(data => this._getFlip(data))
                                    }
                                }}>
                                <Text style={styles.pickBut}>Take Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // style={styles.discardBut}
                                onPress={() => {
                                    this.setState({
                                        openCamera: false,
                                        photo: null
                                    });
                                }}>
                                <Text style={styles.discardBut}>Discard</Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        } else {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Content>
                        <Item style={styles.topheader}>
                            <Text style={styles.topText}>This is how it works!</Text>
                        </Item>
                        <Grid style={styles.centerInfoBox}>
                            <Col size={30}>
                                <Image style={{ width: 70, height: 70 }} source={Images.IconPick4} />
                            </Col>
                            <Col size={70}>
                                <Text style={styles.pickText}>TAKE A PIC OF PRODUCT</Text>
                            </Col>
                        </Grid>
                        <Item style={styles.imageContainer}>
                            {this.showImg()}
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
                            <TouchableOpacity
                                style={styles.tackpick}
                                onPress={() => {
                                    this.setState({ points: null })
                                    this.setState({ tags: [] })
                                    this.setState({ openCamera: true });
                                }}>
                                <Text style={styles.topText}>Take A Pick</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this._handlePress} style={styles.botheader}>
                            <Text style={styles.botText}>Save challenge</Text>
                        </TouchableOpacity>
                    </Content>
                </ScrollView>
            );
        }
    }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, picks: user.picks })

const mapDispatchToProps = (dispatch) => {
    const { actions } = require('@redux/UserRedux')
    return {
        setPicks: (picks) => dispatch(actions.setPicks(picks)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pick)