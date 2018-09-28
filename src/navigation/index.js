'use strict'

import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Color, Images, Icons } from '@common'
import { TabBar, TabBarIcon } from '@components'
import { Login, Forgot, SignUp, Search, Browse, Recalls, UserPoints, Coupons, Citizen, Barcode, HomeScan, Picks, Pick, AboutUs, Location, Invite } from "@containers";

import CustomPageScreen from './CustomPageScreen'
import AuthScreen from './AuthScreen'
import DashboardScreen from './DashboardScreen'
import SearchDetailsScreen from './SearchDetailsScreen'
import WalletScreen from './WalletScreen'
import MessagesScreen from './MessagesScreen'
import ChatScreen from './ChatScreen'

const DashboardStack = StackNavigator({
    Dashboard: { screen: DashboardScreen },
})

const WalletStack = StackNavigator({
    Wallet: { screen: WalletScreen },
})

const BarcodeStack = StackNavigator({
    Barcode: { screen: Barcode },
})

const ChatUsersStack = StackNavigator({
    messages: MessagesScreen,
    Chat: ChatScreen,
})

const BrowseStack = StackNavigator({
    Browse: { screen: Browse },
    Recalls: { screen: Recalls },
    UserPoints: { screen: UserPoints },
    Coupons: { screen: Coupons },
    Citizen: { screen: Citizen }
})

const CustomPageScreenStack = StackNavigator({
    Custompage: { screen: CustomPageScreen }
})

const AboutUsStack = StackNavigator({
    AboutUs: { screen: AboutUs }
})

const LocationStack = StackNavigator({
    Location: { screen: Location }
})

const InviteStack = StackNavigator({
    Invite: { screen: Invite }
})

const SearchStack = StackNavigator({
    Search: { screen: Search }
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
            tabBarIcon: ({ tintColor }) => <TabBarIcon type={'Mat'} icon={Icons.Entypo.Barcode}
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
    BrowsePage: {
        screen: BrowseStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Browse'} icon={Icons.Entypo.Grid}
                tintColor={tintColor} />
        }
    },
    Custompages: { screen: CustomPageScreenStack },
    Search: { screen: SearchStack },
    SearchDetails: { screen: SearchDetailsScreen },
    AboutUs: { screen: AboutUsStack },
    Location: { screen: LocationStack },
    Invite: { screen: InviteStack },
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
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Camera'} icon={Icons.Entypo.Camera}
                tintColor={tintColor} />
        }
    },
    PicksScreen: {
        screen: PicksStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <TabBarIcon name={'Folder'} icon={Icons.Entypo.Folder}
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
    Signup: { screen: SignUp },
    pickup13: { screen: pickup13Screen, navigationOptions: { header: null } },
    Main: { screen: AppNavigator, navigationOptions: { header: null } },
}, {
    })

export default MainNavigator;