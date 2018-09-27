import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner, ButtonIndex } from '@components'
import { Languages, Images, Color, Styles } from '@common'
import FirebaseAuth from '@services/FirebaseAuth'
import { Back, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './styles'

class Forgot extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: Back(navigation),
        headerTitle: Logo(),
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloat,
    })

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            confirmResult: null,
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        this.validateForm = this.validateForm.bind(this);
    }


    componentDidMount() {
        const { parms } = this.props
        if (parms) {
            this.setState({ email: parms.email })
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


    validateForm() {
        const { email } = this.state;
        if (Validate.isEmpty(email)) { //check empty
            return 'Please complete the form';
        } else if (!Validate.isEmail(email)) {
            return 'Email is not correct';
        }
        return undefined;
    }

    normalSignIn() {
        const { navigate } = this.props.navigation;
        const { netInfo } = this.props;
        const { email, isLoading } = this.state;

        if (!netInfo.isConnected) return toast(Languages.noConnection);
        if (isLoading) return;
        this.setState({ isLoading: true });

        const _error = this.validateForm();
        if (_error) return this.stopAndToast(_error);

        FirebaseAuth.forgetPassword(email, (success, data, error) => {
            if (success) {
                navigate('Login')
            }
            else if (error) {
                this.setState({ isLoading: false });
                return this.stopAndToast(Languages.GetDataError);
            }
        });
    }

    render() {
        const { email, isLoading } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <Image source={Images.loginLogo} />
                    </View>
                    <View style={styles.loginContainer}>
                        <TextInput
                            {...commonInputProps}
                            ref="email"
                            placeholder={Languages.email}
                            onChangeText={(value) => this.setState({ email: value })}
                            onSubmitEditing={() => this.refs.password && this.refs.password.focus()}
                            keyboardType={'email-address'}
                            returnKeyType={'next'}
                            value={email}
                        />
                        <ButtonIndex text={Languages.submit} textColor={Color.white} containerStyle={styles.loginButton} onPress={() => this.normalSignIn()} />

                    </View>
                </ScrollView>
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View>
        );
    }
}

const commonInputProps = {
    style: styles.input,
    underlineColorAndroid: 'transparent',
    placeholderTextColor: Color.grey,
}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, parms: user.parms })
export default connect(mapStateToProps, undefined, undefined)(Forgot)