import React, { PureComponent } from "react";
import { Chat } from "@containers";
import { Styles } from '@common'
import ChatAPI from '@services/ChatAPI'
import { Back, EmptyView } from './IconNav'

export default class ChatScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: Back(navigation),
        headerTitle: (ChatAPI.getChatUser() && ChatAPI.getChatUser().name) ? ChatAPI.getChatUser().name : '',
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloatActive,
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Chat
                onViewChatcreen={() => navigate('Chat')}
            />
        )
    }
}