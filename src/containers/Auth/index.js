import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner, ButtonIndex } from '@components'
import { Languages, Images, Color } from '@common'
import FirebaseAuth from '@services/FirebaseAuth'
import styles from './styles'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
    }


    componentDidUpdate(prevProps) {
        const { user, onViewMainScreen, onViewLoginScreen } = this.props
        if (user !== prevProps.user) {
            if (user) {
                onViewMainScreen()
            } else {
                onViewLoginScreen()
            }
        }
    }

    componentDidMount() {
        // FirebaseAuth.doSignOut()
        FirebaseAuth.checkAuth((user) => {
            if (!user) {
                onViewLoginScreen()
            }
        });
        const { user, onViewMainScreen, onViewLoginScreen } = this.props
        if (user) {
            onViewMainScreen()
        } else {
            onViewLoginScreen()
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


    render() {
        const { isLoading } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <Image source={Images.loginLogo} />
                    </View>
                </ScrollView>
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View>
        );
    }
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user })
export default connect(mapStateToProps)(Auth)