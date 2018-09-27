import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import Parallax from 'react-native-parallax'
import { Spinner, ButtonIndex } from '@components'
import { Languages, Images, Color } from '@common'
import VerityAPI from '@services/VerityAPI'
import styles from './styles'

class Search extends Component {
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

    componentDidMount(prevProps) {
        const { search, user } = this.props
        if (search || search !== prevProps.search) {
            this.setState({ isLoading: true });
            VerityAPI.searchApi(user.userId, search, (success, data, error) => {
                if (success) {
                    this.setState({ searchResults: data.result });
                    this.setState({ isLoading: false });
                }
                else if (error) {
                    console.log(error)
                    this.setState({ isLoading: false });
                    return this.stopAndToast(Languages.GetDataError);
                }
            });
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

    _search() {
        const { searchtext } = this.state;
        const { setSearch } = this.props
        setSearch(searchtext)
    }

    _searchDetails(search) {
        const { setSearchRes, onViewSearchDetailsScreen } = this.props
        setSearchRes(search)
        onViewSearchDetailsScreen()
    }

    render() {
        const { search } = this.props
        const { isLoading, searchtext, searchResults } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <Image style={styles.searchImg1} source={Images.searchImg} />
                    <TextInput style={{ height: 40, width: '100%', textAlign: 'left' }} value={search} onSubmitEditing={this._search.bind(this)} placeholder="Search Verity" onChangeText={(searchtext) => this.setState({ searchtext })} />
                </View>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <Parallax.ScrollView style={styles.fill}>
                            {searchResults.map((search, index) => {
                                return <Parallax.Image
                                    key={index}
                                    onPress={() => { this._searchDetails(search) }}
                                    style={styles.image}
                                    overlayStyle={styles.overlay}
                                    containerStyle={styles.containerStyle}
                                    parallaxFactor={0.4}>
                                    <View style={styles.searchResBox}>
                                        <Text style={styles.prodName}>UPC : <Text style={styles.blueTxt}>{search.upcCode}</Text></Text>
                                        <View style={styles.prodDetails}>
                                            <View><Image style={styles.searchImg} source={{ uri: search.productImage }} /></View>
                                            <View style={styles.prodTxt}>
                                                <Text style={styles.greyTxt}>{search.productName}</Text>
                                                <Text style={styles.blueTxt}>Category : {search.category}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Parallax.Image>
                            })}
                        </Parallax.ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Search)