import React, { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'

import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner, ButtonIndex } from '@components'
import { Languages, Images, Color } from '@common'
import FirebaseAuth from '@services/FirebaseAuth'
import styles from './styles'

class Login extends Component {

    static navigationOptions = () => ({
        header: null
    })

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            verificationCode: null,
            isLoading: false,
            confirmResult: null,
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        this.validateForm = this.validateForm.bind(this);
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
        const { email, password } = this.state;
        if (Validate.isEmpty(email, password)) { //check empty
            return 'Please complete the form';
        } else if (!Validate.isEmail(email)) {
            return 'Email is not correct';
        }
        return undefined;
    }

    normalSignIn() {
        const { navigate } = this.props.navigation;
        const { netInfo, login } = this.props;
        const { email, password, isLoading } = this.state;

        if (!netInfo.isConnected) return toast(Languages.noConnection);
        if (isLoading) return;
        this.setState({ isLoading: true });

        const _error = this.validateForm();
        if (_error) return this.stopAndToast(_error);

        const user = { email, password };

        FirebaseAuth.normalLoginApi(user, (success, data, error) => {
            if (success) {
                console.log(data)
                login(data.user)
                this.setState({ isLoading: false });
                navigate('Main')
            }
            else if (error) {
                this.setState({ isLoading: false });
                return this.stopAndToast('There is no user record or The password is invalid');
            }
        });
    }

    // fbSignIn() {
    //     const { navigate } = this.props.navigation;
    //     const { netInfo, login } = this.props;
    //     const { isLoading } = this.state;

    //     if (!netInfo.isConnected) return toast(Languages.noConnection);
    //     if (isLoading) return;
    //     this.setState({ isLoading: true });

    //     FirebaseAuth.onLoginOrRegisterWithFacebook((success, data, error) => {
    //         if (success) {
    //             console.log(data.profile)
    //             login(data.profile)
    //             this.setState({ isLoading: false });
    //             navigate('Main')
    //         }
    //         else if (error) {
    //             this.setState({ isLoading: false });
    //             return this.stopAndToast(Languages.GetDataError);
    //         }
    //     });
    // }


    goSignIn() {
        const { navigate } = this.props.navigation;
        const { netInfo, login } = this.props;
        const { isLoading } = this.state;

        if (!netInfo.isConnected) return toast(Languages.noConnection);
        if (isLoading) return;
        this.setState({ isLoading: true });

        FirebaseAuth.onLoginOrRegisterWithGoogle((success, data, error) => {
            if (success) {
                console.log(data.profile)
                login(data.profile)
                this.setState({ isLoading: false });
                navigate('Main')
            }
            else if (error) {
                console.log(error)
                this.setState({ isLoading: false });
                return this.stopAndToast(Languages.GetDataError);
            }
        });
    }

    forgotScreen() {
        const { navigate } = this.props.navigation;
        const { setParms, onViewForgotScreen } = this.props
        const { email } = this.state;
        setParms({ email })
        navigate('Forgot')
    }

    render() {
        const { email, password, isLoading } = this.state
        const { onViewSignUpScreen } = this.props
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
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
                        <TextInput
                            {...commonInputProps}
                            ref="password"
                            placeholder={Languages.password}
                            onChangeText={(value) => this.setState({ password: value })}
                            secureTextEntry={true}
                            returnKeyType={'go'}
                            value={password}
                        />
                        <ButtonIndex text={Languages.login} textColor={Color.white} containerStyle={styles.loginButton} onPress={() => this.normalSignIn()} />
                        <TouchableOpacity onPress={() => this.forgotScreen()}><Text style={styles.forgotPassword}>{Languages.forgotPassword}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Signup')}><Text style={styles.forgotPassword}>{Languages.signup}</Text></TouchableOpacity>
                        <Text style={styles.loginWith}>{Languages.loginWith}</Text>
                        <View style={styles.socialContener}>
                            {/* <TouchableOpacity onPress={() => this.fbSignIn()} style={[styles.FacebookStyle]} >
                                <Image source={Images.fbLogin} />
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => this.goSignIn()} style={[styles.FacebookStyle]} activeOpacity={0.5}>
                                <Image source={Images.googleLogin} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View >
        );
    }
}

const commonInputProps = {
    style: styles.input,
    underlineColorAndroid: 'transparent',
    placeholderTextColor: Color.grey,
}

const mapStateToProps = ({ netInfo }) => ({ netInfo })
const mapDispatchToProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { actions } = require('@redux/UserRedux')
    return {
        ...ownProps,
        ...stateProps,
        login: (data) => dispatch(actions.login(data)),
        setParms: (parms) => dispatch(actions.setParms(parms))
    }
}
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Login)