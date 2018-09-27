import React, { Component } from "react";
import { SignUp } from "@containers";

export default class SignUpScreen extends Component {
    static navigationOptions = () => ({
        header: null
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SignUp
                onViewMainScreen={() => navigate('Main')}
            />
        )
    }
}