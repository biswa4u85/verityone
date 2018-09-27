import React, { Component } from 'react'
import { AsyncStorage, Text, View } from 'react-native';
import Parallax from 'react-native-parallax'
import { connect } from 'react-redux'
import { Languages, Styles } from '@common'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import { toast } from '@app/Omni'

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
            picks: [],
        }
        this.getPicks()
        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
    }

    componentDidUpdate(prevProps) {
        const { picks } = this.props
        if (picks !== prevProps.picks) {
            this.getPicks()
        }
    }

    async getPicks() {
        if (await AsyncStorage.getItem('@pick:myPicks')) {
            let myPicks = JSON.parse(await AsyncStorage.getItem('@pick:myPicks'))
            this.setState({ picks: myPicks })
        }
    }

    checkConnection() {
        const { netInfo } = this.props
        if (!netInfo.isConnected) toast(Languages.noConnection)
        return netInfo.isConnected
    }

    stopAndToast(msg) {
        toast(msg)
        this.setState({ isLoading: false })
    }

    async removePick(category) {
        if (await AsyncStorage.getItem('@pick:myPicks')) {
            let myPicks = JSON.parse(await AsyncStorage.getItem('@pick:myPicks'))
            let newPicks = []
            for (let pick of myPicks) {
                if (pick.photo !== category.photo) {
                    newPicks.push(pick)
                }
            }
            await AsyncStorage.setItem('@pick:myPicks', JSON.stringify(newPicks));
            this.setState({ picks: newPicks })
        }
    }

    randerTags(tags) {
        if (tags) {
            return <View style={styles.tagBox}>
                {tags.map((tag, index) => {
                    return <Text key={index} style={styles.tagTxt}>{tag}</Text>
                })}
            </View>
        }
    }

    render() {
        const mainCategories = this.state.picks;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Parallax.ScrollView style={styles.fill}>
                    {mainCategories.map((category, index) => {
                        return <Parallax.Image
                            key={index}
                            onPress={() => { }}
                            style={styles.image}
                            overlayStyle={styles.overlay}
                            containerStyle={styles.containerStyle}
                            parallaxFactor={0.4}
                            source={{ uri: category.photo }}>
                            <View style={styles.dim_layout}>
                                {/* <View style={styles.TitleArea}>
                                    <Text style={styles.h1}>{category.title}</Text>
                                    <View style={styles.ratingBox}><Text style={styles.whiteTxt}>{category.points}</Text></View>
                                </View> */}
                                <View style={styles.tagsArea}>
                                    {this.randerTags(category.tags)}
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
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, picks: user.picks })

const mapDispatchToProps = (dispatch) => {
    const { actions } = require('@redux/UserRedux')
    return {
        setPicks: (picks) => dispatch(actions.setPicks(picks)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Picks)