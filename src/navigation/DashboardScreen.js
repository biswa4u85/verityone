import React, { PureComponent } from "react";
import { Dashboard } from "@containers";

export default class DashboardScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Dashboard
                onViewSearchScreen={() => navigate('Search')}
                onViewScanscreen={() => navigate('Scans')}
                onViewScancreen={() => navigate('Scan')}
            />
        )
    }
}