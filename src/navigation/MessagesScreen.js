import React, { PureComponent } from "react";
import { Messages } from "@containers";

export default class MessagesScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Messages
                onViewChatcreen={() => navigate('Chat')}
            />
        )
    }
}