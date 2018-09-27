import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Languages, Color } from "@common";
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux';
import Button from '@components/Button';
import Spinner from '@components/Spinner';
import VerityAPI from '@services/VerityAPI'
import styles from './styles'

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            ERCAddress: '',
            VRTYBalance: '',
            VRTYUSDValue: '',
            ERCAddressFieldId: '',
            VRTYBalanceFieldId: '',
            VRTYUSDValueFieldId: '',
            isLoading: false,
        };

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        this.validateForm = this.validateForm.bind(this);

    }

    async componentDidMount() {
        const { user } = this.props
        this.setState({ userId: user.userId ? user.userId : null })
        const userId = user.userId ? user.userId : 601
        const json = await VerityAPI.getVerityTokenApi(userId)
        if (json.success == 1) {
            for (let details of json.result) {
                if (details.fieldName == "ERC20 Address:") {
                    this.setState({ ERCAddress: details.value });
                    this.setState({ ERCAddressFieldId: details.fieldId });
                }
                else if (details.fieldName == "VRTY Balance:") {
                    this.setState({ VRTYBalance: details.value });
                    this.setState({ VRTYBalanceFieldId: details.fieldId });
                }
                else if (details.fieldName == "VRTY USD Value:") {
                    this.setState({ VRTYUSDValue: details.value });
                    this.setState({ VRTYUSDValueFieldId: details.fieldId });
                }
            }
        } else {
            this.stopAndToast(json.message);
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
        const { ERCAddress, VRTYBalance, VRTYUSDValue, ERCAddressFieldId, VRTYBalanceFieldId, VRTYUSDValueFieldId } = this.state;
        if (Validate.isEmpty(ERCAddress, VRTYBalance, VRTYUSDValue, ERCAddressFieldId, VRTYBalanceFieldId, VRTYUSDValueFieldId)) { //check empty
            return 'Please complete the form';
        }
        return undefined;
    }

    async onSubmitHandle() {

        const { netInfo, onViewDashboardcreen } = this.props;
        const { isLoading, userId, ERCAddress, VRTYBalance, VRTYUSDValue, ERCAddressFieldId, VRTYBalanceFieldId, VRTYUSDValueFieldId } = this.state;

        if (!netInfo.isConnected) return toast(Languages.noConnection);

        if (isLoading) return;
        this.setState({ isLoading: true });

        const _error = this.validateForm();
        if (_error) return this.stopAndToast(_error);

        var fields = [
            { "fieldId": ERCAddressFieldId, 'value': ERCAddress },
            { "fieldId": VRTYBalanceFieldId, 'value': VRTYBalance },
            { "fieldId": VRTYUSDValueFieldId, 'value': VRTYUSDValue }
        ];

        const json = await VerityAPI.saveVerityTokenApi(userId, fields)
        if (json.success == 1) {
            this.stopAndToast(json.message);
            onViewDashboardcreen()
            this.setState({ isLoading: false });
        } else {
            this.stopAndToast(json.message);
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isLoading, ERCAddress, VRTYBalance, VRTYUSDValue } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.containerPadding}>
                    <Text style={styles.label}>{Languages.tokenTitle}</Text>
                    <TextInput
                        {...commonInputProps}
                        ref="ERCAddress"
                        placeholder={Languages.ERCAddress}
                        onChangeText={(ERCAddress) => this.setState({ ERCAddress })}
                        onSubmitEditing={() => this.refs.VRTYBalance && this.refs.VRTYBalance.focus()}
                        autoCapitalize={'words'}
                        returnKeyType={'next'}
                        value={ERCAddress}
                    />
                    <TextInput
                        {...commonInputProps}
                        ref="VRTYBalance"
                        placeholder={Languages.VRTYBalance}
                        onChangeText={(VRTYBalance) => this.setState({ VRTYBalance })}
                        onSubmitEditing={() => this.refs.VRTYUSDValue && this.refs.VRTYUSDValue.focus()}
                        autoCapitalize={'words'}
                        returnKeyType={'next'}
                        value={VRTYBalance}
                    />
                    <TextInput
                        {...commonInputProps}
                        ref="VRTYUSDValue"
                        placeholder={Languages.VRTYUSDValue}
                        onChangeText={(VRTYUSDValue) => this.setState({ VRTYUSDValue })}
                        onSubmitEditing={() => this.refs.genderType && this.refs.genderType.focus()}
                        autoCapitalize={'words'}
                        returnKeyType={'next'}
                        value={VRTYUSDValue}
                    />
                    <Button
                        containerStyle={styles.signUpButton}
                        text={Languages.verifyNew}
                        onPress={this.onSubmitHandle.bind(this)}
                    />
                </ScrollView>
                {isLoading ? <Spinner mode={'overlay'} /> : null}
            </View>
        );
    }
}

const commonInputProps = {
    style: styles.input,
    underlineColorAndroid: 'transparent',
    placeholderTextColor: Color.gray,
};

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user })
export default connect(mapStateToProps, undefined, undefined)(Wallet)