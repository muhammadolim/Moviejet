const initState = {
    trending: [],
    upcoming: [],
    popular: [],
    top_rated: [],
    now_playing: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
};

const moviesReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_MOVIES":
            return {
                ...state,
                trending: action.payload.trending,
            };
        case "FETCH_UPCOMING":
            return {
                ...state,
                upcoming: action.payload.upcoming,
            };
        case "FETCH_POPULAR":
            return {
                ...state,
                popular: action.payload.popular,
            };
        case "FETCH_TOP_RATED":
            return {
                ...state,
                top_rated: action.payload.top_rated,
            };
        case "FETCH_NOW_PLAYING":
            return {
                ...state,
                now_playing: action.payload.now_playing,
            };
        case "LOADING_MOVIES":
            return {
                ...state,
                isLoading: true,
                hasError: false,
            };
        case "MOVIES_SETTLED":
            return {
                ...state,
                isLoading: false,
                isLoaded: !action.payload.hasError,
                hasError: action.payload.hasError,
            };
        default:
            return state;
    }
};

export default moviesReducer;
