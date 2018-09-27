import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Languages, Images, Color } from "@common";
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm from 'react-native-simple-radio-button';
// import ImagePicker from 'react-native-image-picker';
import { toast, error, Validate } from '@app/Omni';
import { connect } from 'react-redux';
import Button from '@components/Button';
import Spinner from '@components/Spinner';
import VerityAPI from '@services/VerityAPI'
import FirebaseAPI from '@services/FirebaseAPI'
import FirebaseAuth from '@services/FirebaseAuth'
import styles from './styles'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderType: 'male',
      isDateTimePickerVisible: false,
      uid: '',
      name: '',
      mobile: '',
      password: '',
      address: '',
      email: '',
      profileURL: Images.upload,
      profileImage: '',
      proFile: '',
      DOB: new Date().toLocaleDateString(),
      isLoading: false,
    };

    this.checkConnection = this.checkConnection.bind(this)
    this.stopAndToast = this.stopAndToast.bind(this)
    this.validateForm = this.validateForm.bind(this);

    this.focusName = () => this.refs.name && this.refs.name.focus();
  }

  componentDidMount() {
    const { parms } = this.props;
    if (parms) {
      this.setState({ uid: parms.uid })
      this.setState({ email: parms.email })
    }
    this.focusName()
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
    const { name, mobile, email, password, address } = this.state;
    if (Validate.isEmpty(name, mobile, email, password, address)) { //check empty
      return 'Please complete the form';
    } else if (!Validate.isEmail(email)) {
      return 'Email is not correct';
    }
    return undefined;
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    this.setState({ DOB: date.toLocaleDateString() })
    this._hideDateTimePicker();
  };

  onSignUpHandle() {

    const { netInfo, login, onViewMainScreen } = this.props;
    const { uid, profileImage, genderType, name, mobile, email, password, address, DOB, isLoading } = this.state;
    if (!netInfo.isConnected) return toast(Languages.noConnection);

    if (isLoading) return;
    this.setState({ isLoading: true });

    const _error = this.validateForm();
    if (_error) return this.stopAndToast(_error);

    const user = { uid, profileImage, gender: genderType, name, mobile, email, password, address, DOB };

    FirebaseAuth.registerWithEmail(user, (success, data, error) => {
      if (success) {
        login(data.profile)
        onViewMainScreen()
        this.setState({ isLoading: false });
      }
      else if (error) {
        console.log(error)
        this.setState({ isLoading: false });
        return this.stopAndToast(Languages.GetDataError);
      }
    });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker');
    //   }
    //   else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   }
    //   else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   }
    //   else {
    //     this.setState({ profileImage: null });
    //     FirebaseAPI.uploadFile(response, 'profile', (success, dataUrl, error) => {
    //       if (success) {
    //         this.setState({ profileURL: { uri: dataUrl } });
    //         this.setState({ profileImage: dataUrl });
    //       }
    //       else if (error) {
    //         this.setState({ isLoading: false });
    //         return this.stopAndToast(Languages.GetDataError);
    //       }
    //     });

    //   }
    // });
  }

  renderProfileImage() {
    const { profileURL, profileImage } = this.state;
    if (profileImage === null) {
      return <View><Spinner color={'#000'} mode={'normal'} /></View>
    } else {
      return <View><Image
        style={styles.profileImg}
        resizeMode='cover'
        source={profileURL} /></View>
    }
  }


  render() {
    const { isLoading, genderType, name, mobile, email, password, address, DOB } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerPadding}>
          <Text style={styles.label}>{Languages.profileDetail}</Text>
          <TextInput
            {...commonInputProps}
            ref="name"
            placeholder={Languages.name}
            onChangeText={(name) => this.setState({ name })}
            onSubmitEditing={() => this.refs.mobile && this.refs.mobile.focus()}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            value={name}
          />
          <TextInput
            {...commonInputProps}
            ref="mobile"
            placeholder={Languages.mobile}
            onChangeText={(mobile) => this.setState({ mobile })}
            onSubmitEditing={() => this.refs.address && this.refs.address.focus()}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            value={mobile}
          />
          <TextInput
            {...commonInputProps}
            ref="address"
            placeholder={Languages.address}
            onChangeText={(address) => this.setState({ address })}
            onSubmitEditing={() => this.refs.genderType && this.refs.genderType.focus()}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            value={address}
          />
          <TextInput
            {...commonInputProps}
            ref="email"
            placeholder={Languages.email}
            onChangeText={(email) => this.setState({ email })}
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
          <View style={styles.calendarWrap}>
            <Image source={Images.calendar} />
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={styles.dobLabel}>{DOB}</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode={'date'}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={styles.radioWrap}>
            <RadioForm
              radio_props={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
              initial={0}
              animation={false}
              labelHorizontal={true}
              formHorizontal={true}
              value={genderType}
              labelStyle={styles.radioLable}
              onPress={(genderType) => this.setState({ genderType })}
            />
          </View>
          <View style={styles.profileWrap}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              {this.renderProfileImage()}
            </TouchableOpacity>
            <Text style={styles.profileText}>{Languages.profileImg}</Text>
          </View>
          <Button
            containerStyle={styles.signUpButton}
            text={Languages.signup}
            onPress={this.onSignUpHandle.bind(this)}
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

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, parms: user.parms })

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux/UserRedux');
  return {
    login: (user) => dispatch(actions.login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);