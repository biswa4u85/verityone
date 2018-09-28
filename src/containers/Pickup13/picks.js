import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import Parallax from 'react-native-parallax'
import { Spinner, ButtonIndex } from '@components'
import { Languages, Color, Styles } from '@common'
import Icon from 'react-native-vector-icons/EvilIcons'
import FirebaseAPI from '@services/FirebaseAPI'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './picksStyles'

class Picks extends Component {

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
            picks: []
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
    }

    componentDidMount() {
        const { picks } = this.props
        if (picks) {
            let tempPicks = []
            for (let item of Object.keys(picks)) {
                tempPicks.push(picks[item])
            }
            this.setState({ picks: tempPicks })
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

    removePick(item) {
        this.setState({ isLoading: true })
        const { user, setPicks } = this.props
        const path = user.firebaseId + '/' + item.id
        FirebaseAPI.deleteChild('picks', path, (success, data, error) => {
            if (success) {
                FirebaseAPI.getChild('picks', user.firebaseId, (success, data, error) => {
                    if (success) {
                        setPicks(data)
                        this.setState({ isLoading: false })
                    }
                })
            }
            else if (error) {
                this.setState({ isLoading: false });
                return this.stopAndToast(Languages.GetDataError);
            }
        });
    }

    randerPicks() {
        const { picks } = this.state
        if (picks.length != 0) {
            return <Parallax.ScrollView style={styles.fill} >
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
                            {category.tags ? <View style={styles.tagsArea}><View style={styles.tagBox}>
                                {category.tags.map((tag, index) => {
                                    return <Text key={index} style={styles.tagTxt}>{tag}</Text>
                                })}
                            </View></View> : ''}
                            <View style={styles.picEditBox}>
                                <Text style={styles.linkEdit}>{category.points}</Text>
                                <Text style={styles.linkDel} onPress={() => this.removePick(category)}>Delete</Text>
                            </View>
                        </View>
                    </Parallax.Image>
                })}
            </Parallax.ScrollView>
        } else {
            return <View style={styles.noDataBg}>
                <Icon name={'sc-soundcloud'} size={30} color={'#d6d6d6'} />
                <Text style={styles.noDataText}>Looks like you have no data!</Text>
            </View>
        }
    }


    render() {
        const { navigate } = this.props.navigation;
        const { isLoading, picks } = this.state
        console.log(picks)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        {this.randerPicks()}
                    </View>
                </ScrollView>
                <ButtonIndex text={Languages.addScan} textColor={Color.white} containerStyle={styles.fab} onPress={() => navigate('PickScreen')} />
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View>
        );
    }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user, picks: user.picks })
const mapDispatchToProps = (dispatch) => {
    const { actions } = require('@redux/UserRedux');
    return {
        setPicks: (picks) => dispatch(actions.setPicks(picks)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Picks)