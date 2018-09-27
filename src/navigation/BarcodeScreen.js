import React, { PureComponent } from "react";
import { Barcode } from "@containers";
import { Styles } from '@common'
import { Menu, EmptyView, Logo } from './IconNav'

export default class BarcodeScreen extends PureComponent {
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
            <Barcode
                onViewSearchScreen={() => navigate('Search')}
            />
        )
    }
}