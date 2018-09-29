import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Text } from 'react-native'
import { Tab, Tabs, TabHeading, List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images, Styles } from '@common'
import VerityAPI from '@services/VerityAPI'
import { Back, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './citizenStyles'
import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });



class Citizen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
        // headerLeft: Back(navigation),
        // headerTitle: Logo(),
        // headerRight: EmptyView(),
        // headerStyle: Styles.Common.toolbarFloat,
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

    showScaleAnimationDialog = () => {
        this.scaleAnimationDialog.show();
    }

    showSlideAnimationDialog = () => {
        this.slideAnimationDialog.show();
    }

    showFadeAnimationDialog = () => {
        this.fadeAnimationDialog.show();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { isLoading } = this.state

        return (
            <View style={styles.container}>
                <PopupDialog
                    dialogStyle={{ padding: 10, backgroundColor: 'rgba(52, 52, 52, 0)' }}
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    dialogAnimation={scaleAnimation}>
                    <View style={styles.popupBg}>
                        <Text style={styles.popupTxt}>Definition : A citizen scientist is an individual who voluntarily contributes his or her time, effort, and resources toward scientific research in collaboration with professional scientists or alone. These individuals don't necessarily have a formal science background.</Text>
                        <Text style={styles.popupTxt}>This Product is in Alpha Stages and will be released in future updates.</Text>
                    </View>
                </PopupDialog>
                <ScrollView>
                    <View style={styles.userPointHeader}>
                        <View>
                            {Back(this.props.navigation)}
                        </View>
                        <View style={styles.citizenLogo}>
                            <Image style={styles.logoImg} source={Images.citizenLogo} />
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.showScaleAnimationDialog()}>
                                <Image source={Images.iconHelp} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#007aff' }}>
                        <Tab heading={<TabHeading style={styles.tabBg}><Text style={styles.tabTxt}>The Project</Text></TabHeading>}>
                            <View>
                                <Text style={styles.contentTitle}>Welcome to Citizen-Scientist project</Text>
                                <View style={styles.helpBox}>
                                    <Text style={styles.helpTitle}>Help Verity</Text>
                                    <Text style={styles.helpTxt}>We are employing Citizen-Scientists to tackle small projects that pay small amounts quickly and reliably.</Text>
                                </View>
                                <View style={styles.contentArea}>
                                    <Text style={styles.contentTxt}>1.When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                                    <Text style={styles.contentTxt}>2.Galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                                    <Text style={styles.contentTxt}>3.Galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                                    <Text style={styles.contentTxt}>4.Galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                                    <Text style={styles.contentTxt}>5.Galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                                </View>
                                <View style={styles.helpPopupBox}>
                                    <TouchableOpacity onPress={() => this.showScaleAnimationDialog()}>
                                        <Image source={Images.iconHelp} />
                                    </TouchableOpacity>
                                    <Text style={styles.helpIconCapt}>Click this icon for more information!</Text>
                                </View>
                                <Text style={styles.concluTxt}>This project is Alpha and will be released in future updates.</Text>
                            </View>
                        </Tab>
                        <Tab heading={<TabHeading style={styles.tabBg}><Text style={styles.tabTxt}>Your Impact</Text></TabHeading>}>
                            <View>
                                <View style={styles.bodyBg}>
                                    <Image style={styles.pageIcon} source={Images.chat} />
                                    <Text style={styles.textTitle}>Nothing here</Text>                                    
                                </View>
                                <View style={styles.helpPopupBox}>
                                    <TouchableOpacity onPress={() => this.showScaleAnimationDialog()}>
                                        <Image source={Images.iconHelp} />
                                    </TouchableOpacity>
                                    <Text style={styles.helpIconCapt}>Click this icon for more information!</Text>
                                </View>
                                <Text style={styles.concluTxt}>This project is Alpha and will be released in future updates.</Text>
                            </View>
                        </Tab>
                    </Tabs>
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
export default connect(mapStateToProps, mapDispatchToProps)(Citizen)