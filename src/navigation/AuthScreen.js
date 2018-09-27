import React, { PureComponent } from "react";
import { Auth } from "@containers";

export default class AuthScreen extends PureComponent {
    static navigationOptions = () => ({
        header: null
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Auth
                onViewMainScreen={() => navigate('Main')}
                onViewLoginScreen={() => navigate('Login')}
            />
        )
    }
}