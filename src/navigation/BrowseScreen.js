import React, { PureComponent } from "react";
import { Browse } from "@containers";
import { Styles } from '@common'
import { Menu, EmptyView, Logo } from './IconNav'

export default class BrowseScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        // headerLeft: Menu(),
        // headerTitle: Logo(),
        // headerRight: EmptyView(),
        // headerStyle: Styles.Common.toolbarFloat,
        header: null
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Browse
                onViewSearchScreen={() => navigate('Search')}
            />
        )
    }
}