import React, { PureComponent } from "react";
import { Scans } from "@containers";
import { Styles } from '@common'
import { Menu, EmptyView, Logo } from './IconNav'

export default class ScansScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: Menu(),
        headerTitle: Logo(),
        headerRight: EmptyView(),
        headerStyle: Styles.Common.toolbarFloat,
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Scans
                onViewScanScreen={() => navigate('Scan')}
            />
        )
    }
}