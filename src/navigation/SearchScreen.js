import React, { PureComponent } from "react";
import { Search } from "@containers";
import { Styles } from '@common'
import { Menu, Back, EmptyView, Logo } from './IconNav'

export default class SearchScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: Back(navigation),
        headerTitle: Logo(),
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloat,
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Search
                onViewSearchDetailsScreen={() => navigate('SearchDetails')}
            />
        )
    }
}