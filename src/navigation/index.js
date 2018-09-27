'use strict'

import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Color, Images, Icons } from '@common'
import { TabBar, TabBarIcon } from '@components'
import { Login, Forgot, Barcode, HomeScan, Picks, Pick } from "@containers";

import CustomPageScreen from './CustomPageScreen'
import AuthScreen from './AuthScreen'
import SignUpScreen from './SignUpScreen'
import DashboardScreen from './DashboardScreen'
import SearchScreen from './SearchScreen'
import SearchDetailsScreen from './SearchDetailsScreen'
import WalletScreen from './WalletScreen'
import ScansScreen from './ScansScreen'
import ScanScreen from './ScanScreen'
import MessagesScreen from './MessagesScreen'
import ChatScreen from './ChatScreen'
import BrowseScreen from './BrowseScreen'

const DashboardStack = StackNavigator({
    Dashboard: { screen: DashboardScreen },
})

const WalletStack = StackNavigator({
    Wallet: { screen: WalletScreen },
})

const BarcodeStack = StackNavigator({
    Barcode: { screen: Barcode },
})

const ScanStack = StackNavigator({
    Scans: { screen: ScansScreen },
    Scan: { screen: ScanScreen },
})

const ChatUsersStack = StackNavigator({
    messages: MessagesScreen,
    Chat: ChatScreen,
})


const BrowseStack = StackNavigator({
    Browse: { screen: BrowseScreen },
})

const AppNavigator = TabNavigator({
    Home: {
        screen: DashboardStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Home'} icon={Icons.Entypo.Home}
                tintColor={tintColor} />
        }
    },
    Wallet: {
        screen: WalletStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Wallet'} icon={Icons.Entypo.Wallet}
                tintColor={tintColor} />
        }
    },
    Barcode: {
        screen: BarcodeStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon type={'Mat'} icon={Icons.MaterialCommunityIcons.Barcode}
                tintColor={tintColor} />
        }
    },
    Message: {
        screen: ChatUsersStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Chat'} icon={Icons.Entypo.Chat}
                tintColor={tintColor} />
        }
    },
    Browse: {
        screen: BrowseStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Browse'} icon={Icons.Entypo.Grid}
                tintColor={tintColor} />
        }
    },
    Custompage: { screen: CustomPageScreen },
    Search: { screen: SearchScreen },
    SearchDetails: { screen: SearchDetailsScreen },
    Scan: { screen: ScanStack },
},
    {
        tabBarComponent: TabBar,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: Color.tabbarTint,
            inactiveTintColor: Color.tabbarColor,
        },
        lazy: true
    }
)

const HomeScanStack = StackNavigator({
    HomeScan: { screen: HomeScan },
})

const PicksStack = StackNavigator({
    Picks: { screen: Picks },
})

const PickStack = StackNavigator({
    Pick: { screen: Pick },
})

const pickup13Screen = TabNavigator({
    Default: {
        screen: HomeScanStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Home'} icon={Icons.Entypo.Home}
                tintColor={tintColor} />

        }
    },
    PickScreen: {
        screen: PickStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Home'} icon={Icons.Entypo.Home}
                tintColor={tintColor} />
        }
    },
    PicksScreen: {
        screen: PicksStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Home'} icon={Icons.Entypo.Home}
                tintColor={tintColor} />
        }
    },
},
    {
        tabBarComponent: TabBar,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: Color.tabbarTint,
            inactiveTintColor: Color.tabbarColor,
        },
        lazy: true
    }
)

const MainNavigator = StackNavigator({
    Auth: { screen: AuthScreen },
    Login: { screen: Login },
    Forgot: { screen: Forgot },
    Signup: { screen: SignUpScreen },
    pickup13: { screen: pickup13Screen, navigationOptions: { header: null } },
    Main: { screen: AppNavigator, navigationOptions: { header: null } },
}, {
    })

export default MainNavigator;