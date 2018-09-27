import React, { PureComponent } from "react";
import { SearchDetails } from "@containers";
import { Styles } from '@common'
import { Menu, Back, EmptyView, Logo } from './IconNav'

export default class SearchDetailsScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: Back(navigation),
        headerTitle: Logo(),
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloat,
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SearchDetails

            />
        )
    }
}