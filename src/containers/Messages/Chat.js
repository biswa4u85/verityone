import React, { Component } from 'react';
import {
    Text,
    View,
    NetInfo,
    TouchableOpacity,
    AsyncStorage,
    Image,
    FlatList,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

import { Languages, Images } from "@common";
import Parallax from 'react-native-parallax'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux';
import Button from '@components/Button';
import Spinner from '@components/Spinner';
import FirebaseAPI from '@services/FirebaseAPI'
import ChatAPI from '@services/ChatAPI'
import { Back, EmptyView, Logo } from '../../navigation/IconNav'

import { GiftedChat } from 'react-native-gifted-chat';

import styles from './chatStyle'

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            name: '',
            messages: [],
            emptyMessage: "",
            loading: false
        }
    }

    componentWillUnmount() {
        ChatAPI.closeChat();
    }

    componentDidMount() {
        const { user, chatUser } = this.props
        ChatAPI.setChatUser(chatUser);
        ChatAPI.setloggedInUser(user);
        this.setState({ uid: chatUser.firebaseId })
        this.setState({ name: chatUser.name })
        this.setState({ 'loading': true });
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShowListener,
        );
        ChatAPI.loadMessages((message) => {
            if (Object.keys(message).length !== 0) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, message),
                    };
                });
            }

            if (this.state.messages.length == 0) {
                this.setState({ "emptyMessage": "No messages available." })
            }
            else {
                this.setState({ "emptyMessage": "" })
            }
            this.setState({ 'loading': false })
        });
    }

    render() {
        const { uid, name, messages } = this.state
        const { onViewChatUsersScreen } = this.props
        return (
            <View style={styles.row} >
                {
                    (this.state.emptyMessage != "" &&
                        <View style={[styles.container, styles.row, styles.emptyMessageStyle]}>
                            <Text style={{ fontSize: 20 }}>{this.state.emptyMessage}</Text>
                        </View>
                    )
                }
                <GiftedChat
                    messages={messages}
                    onSend={(message) => {
                        ChatAPI.sendMessage(message);
                    }}
                    user={{
                        _id: uid,
                        name: name
                    }}
                />
                {(Platform.OS === 'ios' &&
                    <KeyboardAvoidingView behavior={'position'} enabled />
                )}
                {(Platform.OS === 'android' &&
                    <KeyboardAvoidingView behavior={'padding'} />
                )}

                {
                    (this.state.loading &&
                        <View style={[styles.loading]}>
                            <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
                        </View>)
                }
            </View >
        );
    }
    keyboardDidShowListener = e => {
        this.setState({
            keyboardOpen: true,
            keyboardHeight: e.endCoordinates.height,
        });
    };

}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user: user.user, chatUser: user.chatUser })
export default connect(mapStateToProps, null)(Chat);