import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Text } from 'react-native'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images } from '@common'
import VerityAPI from '@services/VerityAPI'
import styles from './styles'

class Browse extends Component {
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
        // const { user } = this.props
        // this.setState({ isLoading: true });
        // VerityAPI.searchApi(user.userId, '', (success, data, error) => {
        //     if (success) {
        //         let tempData = {}
        //         for (let item of data.result) {
        //             if (item.category in tempData === false) {
        //                 tempData[item.category] = [item.category, item.productImage]
        //             }
        //         }
        //         this.setState({ searchResults: tempData });
        //         this.setState({ isLoading: false });
        //     }
        //     else if (error) {
        //         console.log(error)
        //         this.setState({ isLoading: false });
        //         return this.stopAndToast(Languages.GetDataError);
        //     }
        // });
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

    _search(searchtext) {
        const { setSearch, onViewSearchScreen } = this.props
        setSearch(searchtext)
        onViewSearchScreen()
    }

    render() {
        const { search } = this.props
        const { isLoading, searchtext, searchResults } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.searchBox}>
                        <Image style={styles.searchImg} source={Images.searchImg} />
                        <TextInput style={styles.searchText} value={searchtext} onSubmitEditing={this._search.bind(this)} placeholder="Search" onChangeText={(searchtext) => this.setState({ searchtext })} />
                    </View>
                    <View style={styles.scanBoxTop}>
                        <Text style={styles.catText}>Top Features</Text>
                    </View>
                    {/* <View style={styles.arrangeColomn}>
                        {Object.keys(searchResults).map((search, index) => {
                            return <View key={index} style={styles.catagoryContainer}>
                                <ImageBackground
                                    source={{ uri: searchResults[search][1] }}
                                    style={styles.catagoryImage}>
                                    <TouchableOpacity style={styles.catBox} onPress={() => this._search(searchResults[search][0])}>
                                        <Text style={styles.greyTxt}>{searchResults[search][0]}</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        })}
                    </View> */}
                    <View style={styles.arrangeColomn}>
                        <View style={styles.catagoryContainer}>
                            <ImageBackground
                                source={Images.browse}
                                style={styles.catagoryImage}>
                                <TouchableOpacity style={styles.catBox} onPress={() => this._search('recalls')}>
                                    <Text style={styles.greyTxt}>Recalls</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View style={styles.catagoryContainer}>
                            <ImageBackground
                                source={Images.browse}
                                style={styles.catagoryImage}>
                                <TouchableOpacity style={styles.catBox} onPress={() => this._search('user points')}>
                                    <Text style={styles.greyTxt}>User Points</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View style={styles.catagoryContainer}>
                            <ImageBackground
                                source={Images.browse}
                                style={styles.catagoryImage}>
                                <TouchableOpacity style={styles.catBox} onPress={() => this._search('coupons')}>
                                    <Text style={styles.greyTxt}>Coupons</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View style={styles.catagoryContainer}>
                            <ImageBackground
                                source={Images.browse}
                                style={styles.catagoryImage}>
                                <TouchableOpacity style={styles.catBox} onPress={() => this._search('citizen scientist project')}>
                                    <Text style={styles.greyTxt}>Citizen Scientist Project</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Browse)