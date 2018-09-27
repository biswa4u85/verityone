import React, { Component } from 'react'
import { Content, Grid, Col, Item, Text } from 'native-base';
import { TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux'
import { Languages, Images, Styles } from '@common'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import { toast } from '@app/Omni'
import styles from './homeStyles'

class HomeScan extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: Menu(),
        headerTitle: Logo(),
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloat,
    })

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        this._handlePress = this._handlePress.bind(this)
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


    _handlePress() {
        const { navigate } = this.props.navigation;
        navigate('PickScreen')
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Content>
                    <Item style={styles.topheader}>
                        <Text style={styles.topText}>Help prevent fraud by reinforcing the validity of the products you Eat and Use everyday. Scan-13 Products To Get Started!</Text>
                    </Item>
                    <Grid style={styles.centerInfoBox}>
                        <Col size={30}>
                            <Image style={{ width: 70, height: 70 }} source={Images.IconPick1} />
                        </Col>
                        <Col size={70}>
                            <Text style={styles.pickText}>Scan or take a picture of a Product!</Text>
                        </Col>
                    </Grid>
                    <Grid style={styles.centerInfoBox}>
                        <Col size={30}>
                            <Image style={{ width: 70, height: 70 }} source={Images.IconPick2} />
                        </Col>
                        <Col size={70}>
                            <Text style={styles.pickText}>We use the latest technology to analyze and provide you the most updated information in our system.</Text>
                        </Col>
                    </Grid>
                    <Grid style={styles.centerInfoBox}>
                        <Col size={30}>
                            <Image style={{ width: 70, height: 70 }} source={Images.IconPick3} />
                        </Col>
                        <Col size={70}>
                            <Text style={styles.pickText}>Review and get rewarded for filling in missing information!</Text>
                        </Col>
                    </Grid>
                    <TouchableOpacity onPress={this._handlePress} style={styles.botheader}>
                        <Text style={styles.botText}>Continue challenge</Text>
                    </TouchableOpacity>
                </Content>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ netInfo }) => ({ netInfo })
export default connect(mapStateToProps, null)(HomeScan)
