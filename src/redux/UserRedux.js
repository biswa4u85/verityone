const types = {
    LOGOUT: 'LOGOUT',
    PARMS: 'SET_PARMS',
    LOGIN: 'LOGIN_SUCCESS',
    SELECT_CHAT: 'SELECT_CHAT',
    SET_PICKS: 'SET_PICKS',
    SET_SEARCH: 'SET_SEARCH',
    SET_SEARCH_RES: 'SET_SEARCH_RES',
    FINISH_INTRO: 'FINISH_INTRO'
};

export const actions = {
    setParms: (parms) => {
        return { type: types.PARMS, parms };
    },
    login: (user) => {
        return { type: types.LOGIN, user };
    },
    selectChatUser: (chatUser) => {
        return { type: types.SELECT_CHAT, chatUser };
    },
    setPicks(picks) {
        return { type: types.SET_PICKS, picks };
    },
    setSearch(search) {
        return { type: types.SET_SEARCH, search };
    },
    setSearchRes(searchRes) {
        return { type: types.SET_SEARCH_RES, searchRes };
    },
    logout() {
        return { type: types.LOGOUT };
    },
    finishIntro() {
        return { type: types.FINISH_INTRO };
    }
};

const initialState = {
    user: null,
    parms: null,
    chatUser: null,
    picks: null,
    search: null,
    searchRes: null,
    finishIntro: null
};

export const reducer = (state = initialState, action) => {
    const { type, user, parms, chatUser, picks, search, searchRes } = action;
    switch (type) {
        case types.LOGOUT:
            return Object.assign({}, initialState);
        case types.PARMS:
            return { ...state, parms };
        case types.LOGIN:
            return { ...state, user };
        case types.SELECT_CHAT:
            return { ...state, chatUser };
        case types.SET_PICKS:
            return { ...state, picks };
        case types.SET_SEARCH:
            return { ...state, search };
        case types.SET_SEARCH_RES:
            return { ...state, searchRes };
        case types.FINISH_INTRO:
            return { ...state, finishIntro: true };
        default:
            return state;
    }
};