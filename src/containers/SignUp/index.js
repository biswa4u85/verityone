import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Content, Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Languages, Images, Color, Styles } from "@common";
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
import { Constants, ImagePicker, Permissions } from 'expo';
import { Back, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './styles'

const INITIAL_STATE = {
  isDateTimePickerVisible: false,
  birthDay: new Date().toLocaleDateString(),
  email: '',
  firebaseId: '',
  isManager: null,
  mobileNumber: '',
  name: '',
  referalCode: null,
  socialType: null,
  userId: null,
  profileImage: null,
  uploading: false,
  password: '',
  isEdit: false,
  genderType: 'male',
  isLoading: false,
};

class SignUp extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: Back(navigation),
    headerTitle: Logo(),
    headerRight: EmptyView(),
    headerStyle: Styles.Common.toolbarFloat,
  })

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.checkConnection = this.checkConnection.bind(this)
    this.stopAndToast = this.stopAndToast.bind(this)
    this.validateForm = this.validateForm.bind(this);

    this.focusName = () => this.refs.name && this.refs.name.focus();
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({ birthDay: user.birthDay ? user.birthDay : new Date().toLocaleDateString(), })
      this.setState({ email: user.email })
      this.setState({ firebaseId: user.firebaseId })
      this.setState({ isManager: user.isManager })
      this.setState({ mobileNumber: user.mobileNumber })
      this.setState({ name: user.name })
      this.setState({ referalCode: user.referalCode })
      this.setState({ socialType: user.socialType })
      this.setState({ userId: user.userId })
      this.setState({ profileImage: user.profileImage ? user.profileImage : null })
      this.setState({ isEdit: true })
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
    const { name, mobileNumber, email } = this.state;
    if (Validate.isEmpty(name, mobileNumber, email)) { //check empty
      return 'Please complete the form';
    } else if (!Validate.isEmail(email)) {
      return 'Email is not correct';
    }
    return undefined;
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    this.setState({ birthDay: date.toLocaleDateString() })
    this._hideDateTimePicker();
  };

  onSignUpHandle() {
    const { navigate } = this.props.navigation;
    const { netInfo, login } = this.props;
    const { birthDay, email, password, firebaseId, isManager, mobileNumber, name, referalCode, socialType, userId, profileImage, isEdit, isLoading } = this.state;
    if (!netInfo.isConnected) return toast(Languages.noConnection);

    if (isLoading) return;
    this.setState({ isLoading: true });

    const _error = this.validateForm();
    if (_error) return this.stopAndToast(_error);

    const user = { birthDay, email, password, firebaseId, isManager, mobileNumber, name, referalCode, socialType, userId, profileImage, isEdit };
    FirebaseAuth.registerWithEmail(user, (success, data, error) => {
      if (success) {
        login(data.profile)
        navigate('Main')
        this.setState({ isLoading: false });
      }
      else if (error) {
        console.log(error)
        this.setState({ isLoading: false });
        return this.stopAndToast(Languages.GetDataError);
      }
    });
  }

  _takePhoto = async () => {
    this.setState({ isLoading: true });
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] });
      FirebaseAPI.uploadFile(pickerResult, 'profile', (success, dataUrl, error) => {
        if (success) {
          this.setState({ profileImage: dataUrl })
          this.setState({ isLoading: false });
        }
        else if (error) {
          this.setState({ isLoading: false });
          return this.stopAndToast(Languages.GetDataError);
        }
      });
    }
  };


  renderProfileImage() {
    const { profileImage } = this.state;
    return <View><Image
      style={styles.profileImg}
      resizeMode='cover'
      source={profileImage ? { uri: profileImage } : Images.upload} /></View>
  }


  render() {
    const { isLoading, genderType, name, mobileNumber, email, password, birthDay } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerPadding}> 
        <View style={styles.profileWrap}>            
            <TouchableOpacity onPress={this._takePhoto}>
              {this.renderProfileImage()}
            </TouchableOpacity>
            <Text style={styles.profileText}>{Languages.profileImg}</Text>
          </View>         
          {/* <TextInput
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
            onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
            onSubmitEditing={() => this.refs.email && this.refs.email.focus()}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            value={mobileNumber}
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
          /> */}
          <Form>
            <Item style={styles.profileInputBox} stackedLabel>
            <View style={styles.labelBox}>
              <Label>First Name</Label>
              <Input />
              </View>
              <Icon style={styles.arrowIcon} name="chevron-right" />
            </Item>
            <Item style={styles.profileInputBox} stackedLabel>
            <View style={styles.labelBox}>
              <Label>Last Name</Label>
              <Input />
              </View>
              <Icon style={styles.arrowIcon} name="chevron-right" />
            </Item>
            <Item style={styles.profileInputBox} stackedLabel>
            <View style={styles.labelBox}>
              <Label>Phone Number</Label>
              <Input />
              </View>
              <Icon style={styles.arrowIcon} name="chevron-right" />
            </Item>
            <Item style={styles.profileInputBox} stackedLabel>
              <View style={styles.labelBox}>
              <Label>Email</Label>
              <Input />
              </View>
              <Icon style={styles.arrowIcon} name="chevron-right" />
            </Item>
            <Item style={styles.profileInputBox} stackedLabel>
              <View style={styles.labelBox}>
              <Label>Password</Label>
              <Input />
              </View>
              <Icon style={styles.arrowIcon} name="chevron-right" />
            </Item>            
          </Form>
          <TouchableOpacity style={styles.signUpButton} onPress={this.onSignUpHandle.bind(this)}>
              <Text style={styles.btnTxt}>{Languages.signup}</Text>
          </TouchableOpacity>
          {/* <View style={styles.calendarWrap}>
            <Image source={Images.calendar} />
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={styles.dobLabel}>{birthDay}</Text>
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
          </View> */}          
          {/* <Button
            containerStyle={styles.signUpButton}
            text={Languages.signup}
            onPress={this.onSignUpHandle.bind(this)}
          /> */}
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

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux/UserRedux');
  return {
    login: (user) => dispatch(actions.login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);