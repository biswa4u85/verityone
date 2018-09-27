import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner, ButtonIndex } from '@components'
import { Languages, Color } from '@common'
import styles from './stylesDetails'

class SearchDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
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

    render() {
        const { isLoading } = this.state
        const { searchRes } = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.titleTxt}>{searchRes.productName}</Text>
                        <View style={styles.prodImg}><Image source={{ uri: searchRes.productImage }} /></View>
                    </View>
                    <View style={styles.listDetails}>
                        <Text style={styles.subTitle}>List Details</Text>
                        <View styel={styles.listCont}>
                            <Text style={styles.listRow}><Text style={styles.listTxt}>Company Unique ID:</Text> <Text style={styles.listTxtBlue}>{searchRes.companyUniqueId}</Text></Text>
                            <Text style={styles.listRow}><Text style={styles.listTxt}>Avg Rating:</Text> <Text style={styles.listTxtBlue}>{searchRes.avgRating}</Text></Text>
                            <Text style={styles.listRow}><Text style={styles.listTxt}>Seal Quantity and Quality Percentage:</Text> <Text style={styles.listTxtBlue}>{searchRes.sealPercentage}</Text></Text>
                            <Text style={styles.listRow}><Text style={styles.listTxt}>UPC:</Text> <Text style={styles.listTxtBlue}>{searchRes.upcCode}</Text></Text>
                            <Text style={styles.listRow}><Text style={styles.listTxt}>Item Number:</Text> <Text style={styles.listTxtBlue}>{searchRes.productId}</Text></Text>
                            <Text style={styles.listRow}><Text style={styles.listTxt}>Address:</Text> <Text style={styles.listTxtBlue}>{searchRes.address}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.mapArea}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{ width: '100%', height: 100 }}
                            initialRegion={{
                                latitude: Number(searchRes.lat),
                                longitude: Number(searchRes.lng),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <MapView.Marker
                                coordinate={{
                                    latitude: Number(searchRes.lat),
                                    longitude: Number(searchRes.lng),
                                }}
                                title={searchRes.productName}
                                description={searchRes.address} />
                        </MapView>
                    </View>
                    <View style={styles.footerArea}>
                        <TouchableOpacity style={styles.buttonBg}><Text style={styles.buttonTxt}>Submit Review</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonBg}><Text style={styles.buttonTxt}>All Review</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonBg}><Text style={styles.buttonTxt}>Recomended</Text></TouchableOpacity>
                    </View>
                    <View style={styles.footerArea}>
                        <TouchableOpacity style={styles.buttonBigBg}><Text style={styles.buttonBlkTxt}>Report</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonBigBg}><Text style={styles.buttonBlkTxt}>Claim</Text></TouchableOpacity>
                    </View>
                </ScrollView>
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View >
        );
    }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, searchRes: user.searchRes })
export default connect(mapStateToProps, undefined)(SearchDetails)