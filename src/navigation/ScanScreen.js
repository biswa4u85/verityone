import React, { PureComponent } from "react";
import { Scan } from "@containers";
import { Styles } from '@common'
import { Back, EmptyView, Logo } from './IconNav'

export default class ScanScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        // headerLeft: Back(navigation),
        // headerTitle: Logo(),
        // headerRight: EmptyView(),
        // headerStyle: Styles.Common.toolbarFloat,
        header: null
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Scan
                onViewScansScreen={() => navigate('Scans')}
            />
        )
    }
}