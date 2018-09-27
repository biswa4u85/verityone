export default {
    showStatusBar: false,
    apiUrl: "https://t.verity.bz/index.php?option=com_jewebservices&task=",
    menu: {
        isMultiChild: true,
        listMenuUnlogged: [{
            text: 'Login',
            icon: 'login',
            routeName: 'LoginScreen',
            params: {
                isLogout: false
            },
        }],
        // user logged in
        listMenuLogged: [{
            text: 'Logout',
            icon: 'log-out',
            routeName: 'Custompage',
            params: {
                isLogout: true
            },
        }],
        // Default List
        listMenu: [{
            text: 'Dashboard ',
            icon: 'home',
            routeName: 'Dashboard',
        },
        {
            text: 'Wallet ',
            icon: 'wallet',
            routeName: 'Wallet',
        },
        {
            text: 'Pickup 13 ',
            icon: 'unread',
            routeName: 'pickup13',
        },
        // {
        //     text: 'Scans ',
        //     icon: 'unread',
        //     routeName: 'Scans',
        // },
        // {
        //     text: 'Add Scan ',
        //     icon: 'add-to-list',
        //     routeName: 'Scan',
        // },
        {
            text: 'Messages ',
            icon: 'chat',
            routeName: 'Messages',
        },
        ],
    },
}