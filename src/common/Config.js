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
                pageName: "Logout"
            },
        }],
        // Default List
        listMenu: [{
            text: 'Dashboard ',
            icon: 'home',
            routeName: 'Dashboard',
        },
        {
            text: 'Invite ',
            icon: 'share',
            routeName: 'Invite',
        },
        {
            text: 'Search ',
            icon: 'magnifying-glass',
            routeName: 'Search',
        },
        {
            text: 'Recent Scans ',
            icon: 'briefcase',
            routeName: 'Picks',
        },
        {
            text: 'Pickup 13 ',
            icon: 'unread',
            routeName: 'pickup13',
        },
        {
            text: 'About Us ',
            icon: 'database',
            routeName: 'AboutUs',
        },
        {
            text: 'Location ',
            icon: 'map',
            routeName: 'Location',
        },
        ],
    },
}